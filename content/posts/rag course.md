---
title: "Completing NVIDIA's Building RAG Agents with LLMs: A Winter Break Well Spent"
description: "My experience completing NVIDIA's Building RAG Agents with LLMs course, learning LangChain, vector stores, FAISS, deployment, and an innovative LLM-as-a-Judge evaluation."
date: 2025-12-23
tags:
  - AI
  - RAG
  - LLMs
  - LangChain
  - NVIDIA
  - Machine Learning
  - Vector Databases
---

I had started the **Building RAG Agents with LLMs** course by NVIDIA quite a long time ago. With the sudden boom in the field of AI and a strong urge to upskill myself, this course was always on my list. However, during the semester, things got hectic with academics, exams, fests, and other activities, and I couldn't really give it the time it deserved.

So when winter vacations finally arrived, I decided that this would be the *first thing* I would complete and today, I officially finished the course.

---

## What is RAG?

RAG stands for **Retrieval-Augmented Generation**. In simple terms, instead of relying only on the model's internal knowledge, RAG allows an LLM to **retrieve relevant information from an external knowledge base** before generating an answer.

This approach is extremely useful in scenarios where:
- Information is domain-specific
- Data keeps changing
- Accuracy matters more than creativity

Since the model grounds its answers in retrieved data, RAG significantly **reduces hallucinations**, which is a major limitation of vanilla LLMs.

---

## LangChain and the RAG Pipeline

There are many tools available to build RAG systems, but in this course, we primarily worked with **LangChain**. LangChain is a powerful framework that helps in building LLM-powered applications by composing modular components such as:
- Prompt templates
- Chains
- Retrievers
- Memory
- Tools and agents

What I really liked about LangChain is how it allows you to **think in terms of data flow**  from user input, to retrieval, to reasoning, to final output.

---

## Core Concepts Covered

The course did a great job covering the essential building blocks of a RAG system:

- **Embeddings**: Converting text into numerical vectors that capture semantic meaning  
- **Document chunking**: Splitting large documents into smaller, meaningful chunks  
- **Vector stores**: Storing and searching embeddings efficiently  
- **Knowledge bases**: Using documents as external memory for the LLM  
- **Chains**: Connecting retrieval, prompts, and LLM calls into a pipeline  

We implemented these concepts step by step and saw how each component affects the final output.

---

## Setting Up Embeddings and Document Processing

One of the first steps in building a RAG system is converting documents into embeddings. Here's how we initialized the embedding model:

```python
from langchain_nvidia_ai_endpoints import ChatNVIDIA, NVIDIAEmbeddings

# NVIDIAEmbeddings.get_available_models()
embedder = NVIDIAEmbeddings(model="nvidia/nv-embed-v1", truncate="END")

# ChatNVIDIA.get_available_models()
instruct_llm = ChatNVIDIA(model="mistralai/mixtral-8x22b-instruct-v0.1")

# Test the embeddings
sample_text = "This is a test document for RAG"
embedding_vector = embedder.embed_query(sample_text)
print(f"Embedding dimension: {len(embedding_vector)}")
```

Next, we needed to chunk documents properly. The course emphasized that **chunk size matters**  too small and you lose context, too large and retrieval becomes inefficient:

```python
from langchain_text_splitter import RecursiveCharacterTextSplitter

# Create a text splitter
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
    length_function=len,
    separators=["\n\n", "\n", " ", ""]
)

# Split documents
chunks = text_splitter.split_documents(documents)
print(f"Total chunks created: {len(chunks)}")
```

---

## Vector Stores and FAISS

One of the important tools introduced was **FAISS (Facebook AI Similarity Search)**. FAISS is a highly efficient library for similarity search and clustering of dense vectors.

Using FAISS with LangChain made it straightforward to:
- Store embeddings
- Perform fast similarity searches
- Retrieve relevant chunks during inference

Here's how we constructed vector stores using LangChain:

```python
from langchain_community.vectorstores import FAISS

# Create vector stores from documents
vecstores = [FAISS.from_texts(extra_chunks, embedder)]
vecstores += [FAISS.from_documents(doc_chunks, embedder) for doc_chunks in docs_chunks]

# Save vector store for later use
vecstores[0].save_local("faiss_index")

# Load it back
loaded_vectorstore = FAISS.load_local("faiss_index", embedder)
```

To perform similarity search:

```python
# Query the vector store
query = "What is retrieval augmented generation?"
relevant_docs = vecstores[0].similarity_search(query, k=3)

for i, doc in enumerate(relevant_docs):
    print(f"\n--- Document {i+1} ---")
    print(doc.page_content)
```

---

## Building the RAG Chain

This is where everything comes together. We built a complete RAG pipeline using LangChain's chain components:

```python
from langchain_community.document_transformers import LongContextReorder
from langchain_core.runnables import RunnableLambda
from langchain_core.runnables.passthrough import RunnableAssign
from langchain_nvidia_ai_endpoints import ChatNVIDIA, NVIDIAEmbeddings

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

from functools import partial
from operator import itemgetter

embedder = NVIDIAEmbeddings(model="nvidia/nv-embed-v1", truncate="END")
instruct_llm = ChatNVIDIA(model="mistralai/mixtral-8x7b-instruct-v0.1")

convstore = default_FAISS()

def save_memory_and_get_output(d, vstore):
    """Accepts 'input'/'output' dictionary and saves to convstore"""
    vstore.add_texts([
        f"User previously responded with {d.get('input')}",
        f"Agent previously responded with {d.get('output')}"
    ])
    return d.get('output')

initial_msg = (
    "Hello! I am a document chat agent here to help the user!"
    f" I have access to the following documents: {doc_string}\n\nHow can I help you?"
)

chat_prompt = ChatPromptTemplate.from_messages([("system",
    "You are a document chatbot. Help the user as they ask questions about documents."
    " User messaged just asked: {input}\n\n"
    " From this, we have retrieved the following potentially-useful info: "
    " Conversation History Retrieval:\n{history}\n\n"
    " Document Retrieval:\n{context}\n\n"
    " (Answer only from retrieval. Only cite sources that are used. Make your response conversational.)"
), ('user', '{input}')])

stream_chain = chat_prompt| RPrint() | instruct_llm | StrOutputParser()

retrieval_chain = (
    {'input' : (lambda x: x)}
    | RunnableAssign({'history' : itemgetter('input') | convstore.as_retriever() | long_reorder | docs2str})
    | RunnableAssign({'context' : itemgetter('input') | docstore.as_retriever()  | long_reorder | docs2str})
    | RPrint()
)


def chat_gen(message, history=[], return_buffer=True):
    buffer = ""
    ## First perform the retrieval based on the input message
    retrieval = retrieval_chain.invoke(message)
    line_buffer = ""

    ## Then, stream the results of the stream_chain
    for token in stream_chain.stream(retrieval):
        buffer += token
        ## If you're using standard print, keep line from getting too long
        yield buffer if return_buffer else token

    ## Lastly, save the chat exchange to the conversation memory buffer
    save_memory_and_get_output({'input':  message, 'output': buffer}, convstore)


test_question = "Tell me about RAG!"  ## <- modify as desired

for response in chat_gen(test_question, return_buffer=False):
    print(response, end='')
```

---

## Deployment with LangServe, FastAPI, and Gradio

Towards the end of the course, we moved beyond notebooks and focused on **deployment**. We used:

- **LangServe** to expose LangChain chains as APIs
- **FastAPI** to build backend services
- **Gradio** to create a simple web interface for interaction

Here's a simplified example of how we created API endpoints:

```python
embedder = NVIDIAEmbeddings(model="nvidia/nv-embed-v1", truncate="END")
instruct_llm = ChatNVIDIA(model="meta/llama3-8b-instruct")

## Load the pre-built document index
docstore = FAISS.load_local("docstore_index", embedder, allow_dangerous_deserialization=True)
retriever = docstore.as_retriever()

## Create the RAG prompt template
rag_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant. Use the following context to answer the user's question. If you don't know the answer based on the context, say so.\\n\\nContext: {context}"),
    ("human", "{input}")
])

rag_prompt_2 = ChatPromptTemplate.from_messages([("system",
    "You are a document chatbot. Help the user as they ask questions about documents."
    " User messaged just asked: {input}\n\n"
    " From this, we have retrieved the following potentially-useful info: "
    " Document Retrieval:\n{context}\n\n"
    " (Answer only from retrieval. Only cite sources that are used. Make your response conversational.)"
), ('user', '{input}')])

app = FastAPI(
  title="LangChain Server",
  version="1.0",
  description="A simple api server using Langchain's Runnable interfaces",
)


add_routes(
    app,
    instruct_llm,
    path="/basic_chat",
)


add_routes(
    app,
    rag_prompt | instruct_llm | StrOutputParser(),
    # rag_prompt_2 | instruct_llm | StrOutputParser(),
    path="/generator",
)

add_routes(
    app,
    retriever,
    path="/retriever",
)

```

And a simple Gradio interface:

```python
import gradio as gr
chatbot = gr.Chatbot(value = [[None, initial_msg]])
demo = gr.ChatInterface(chat_gen, chatbot=chatbot).queue()

try:
    demo.launch(debug=True, share=True, show_api=False)
    demo.close()
except Exception as e:
    demo.close()
    print(e)
    raise e
```

This part really tied everything together, making the project feel production-ready rather than just experimental.

---

## My Favorite Part: LLM as a Judge

My favorite part of the entire course was the **innovative evaluation strategy**.

Since the course was online and non-proctored, NVIDIA used a very intuitive and research-backed approach called **LLM as a Judge**. The ethics and methodology were inspired by an actual research paper, which we also used as part of our vector store.

The evaluation pipeline worked like this:

1. A basic LLM generated **8 synthetic questions** related to RAG along with their **ground-truth answers**
2. I implemented three API endpoints:
   - `/basic_llm`
   - `/retriever`
   - `/generator`
3. The `/generator` endpoint used **RAG**, with context provided by `/retriever`, over **8 research papers stored in a vector database**
4. Now we had two answers for each question:
   - One from a plain LLM
   - One from a RAG-based system
5. The basic LLM was then asked to **judge which answer was better**

Here's a simplified version of how the evaluation worked:

```python
# Generate evaluation questions
evaluation_prompt = """Generate 8 questions about RAG systems 
that can be answered using the provided research papers."""

questions = llm(evaluation_prompt)

# Compare answers
def rag_eval(history, chain_key):
    """RAG Evaluation Chain"""
    if not len(history) or history[-1][0] is not None:
        history += [[None, None]]
    
    try: 
        docstore = FAISS.load_local("/notebooks/docstore_index", lambda x:x, allow_dangerous_deserialization=True)
        Globals.doc_chunks = list(docstore.docstore._dict.values())
        Globals.doc_names = {doc.metadata.get("Title", "Unknown") for doc in Globals.doc_chunks}
    except Exception as e: 
        history[-1][1] = f"Error Getting /notebooks/docstore_index: {e}"
        yield history
        history += [[None, None]]

    if len(Globals.doc_chunks) < 10:
        logger.error(f"Attempted to evaluate with less than 10 chunks total")
        history[-1][1] = "Attempted to evaluate with less than 10 chunks total! Check your FAISS vectorstore"
        yield history
        return

    doc_names = Globals.doc_names 
    doc_chunks = Globals.doc_chunks

    main_chain = {'Basic' : basic_chain, 'RAG' : rag_chain}.get(chain_key)
    eval_llm = basic_chain
    num_points = 0
    num_questions = 8

    for i in range(num_questions):

        synth_chain = get_synth_prompt(doc_chunks) | eval_llm
        print(repr(get_synth_prompt(doc_chunks)))
        
        preface = "Generating Synthetic QA Pair:\n"
        msg_stream = synth_chain.stream({})
        for history, synth_qa, is_error in add_message(msg_stream, history, role=0, preface=preface):
            yield history
        if is_error: break

        synth_pair = synth_qa.split("\n\n")
        if len(synth_pair) < 2:
            logger.error(f"Illegal QA with no break")
            history[-1][0] += f"...\nIllegal QA with no break"
            yield history
        else:   
            synth_q, synth_a = synth_pair[:2]

            msg_stream = main_chain.stream(synth_q)
            for history, rag_response, is_error in add_message(msg_stream, history, role=1):
                yield history
            if is_error: break

            eval_chain = get_eval_prompt() | eval_llm
            usr_msg = f"Question: {synth_q}\n\nAnswer 1 (Ground Truth): {synth_a}\n\n Answer 2 (New): {rag_response}"
            msg_stream = eval_chain.stream(usr_msg)
            for history, eval_response, is_error in add_message(msg_stream, history, role=0, preface="Evaluation: "):
                yield history

            num_points += ("[2]" in eval_response)
        
        history[-1][0] += f"\n[{num_points} / {i+1}]"
    
    if (num_points / num_questions > 0.60):
        msg_stream = (
            "Congrats! You've passed the assessment!! 😁\n"
            "Please make sure to click the ASSESS TASK button before shutting down your course environment"
        )
        for history, eval_response, is_error in add_message(msg_stream, history, role=0):
            yield history

        open("/results/PASSED", "w+")

    else: 
        msg_stream = f"Metric score of {num_points / num_questions}, while 0.60 is required\n"
        for history, eval_response, is_error in add_message(msg_stream, history, role=0):
            yield history            
    
    yield history

```

The passing criteria was **5 out of 8**, and my model scored **7/8**  which was honestly such a relief and felt incredibly rewarding.

---

## Final Thoughts

This course was a great mix of **theory, hands-on practice, and real-world system design**. I learned not just how RAG works, but *why* certain design choices matter.

Completing it during winter break turned out to be one of the best decisions I made  I genuinely enjoyed the process and learned a lot along the way.

Highly recommended to anyone looking to dive deeper into **RAG systems and LLM-based applications** 🚀