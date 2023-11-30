import json
import os

from dotenv import load_dotenv
from langchain.callbacks import get_openai_callback
from langchain.chains import ConversationChain
from langchain.chat_models import AzureChatOpenAI
from langchain.schema import HumanMessage

from langchain.memory import (ConversationBufferMemory,
                              ConversationBufferWindowMemory,
                              ConversationSummaryBufferMemory,
                              ConversationSummaryMemory)

from langchain.document_loaders import WebBaseLoader

from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
)
from langchain.text_splitter import RecursiveCharacterTextSplitter

from langchain.chains import (ConversationChain, ConversationalRetrievalChain,
                              LLMChain)
from langchain.embeddings import OpenAIEmbeddings

from langchain.vectorstores import Chroma

from langchain.llms import AzureOpenAI

load_dotenv(override=True)

OPENAI_API_KEY = os.environ['OPENAI_API_KEY']
MODEL_NAME = os.environ['MODEL_NAME']
DEPLOYMENT_NAME = os.environ['DEPLOYMENT_NAME']
OPENAI_API_BASE = os.environ['OPENAI_API_BASE']
OPENAI_API_VERSION = os.environ['OPENAI_API_VERSION']
#


def create_conversation():
  prompt_trucking = """
You are a nice chatbot having a conversation with a human. 
Your mission is to guide a client to buy an insurance coverage at MoneyWallet. 
You start the conversation asking the client about its insurance needs. The client will be a trucker.
You need to get the following personal information from the client: name, email, telephone and address (especially the state). 
Keep asking kindly until you have it. Once you have it, you need to ask about business activity and number of trucks.
From business activity, you need to be able to propose the best candidate for the industry. 
Also, you need to get info about the annual revenue of the business. 
The last info you will try to obtain is the Vehicle Information Number. This field is optional, not mandatory. 
ONLY If the VIN provided is equal to "3D7LS38C15G802833", you will inform the client you were able to obtain the folowing 
vehicle information and asked for confirmation:

- VehicleType": "TRUCK"
- "Model": "Ram"
- "ModelYear": "2005",
- "Make": "DODGE"

There is no particular order to get the info, it is up to you to decide when to ask each question.
Once you get all info, provide an estimate of a quote premium based on the information provided. This is very important.
Finally, finish the conversation indicating that an agent from MoneyWallet will contact soon.
Show all fields provided by the client in bulletpoints
"""
  llm = AzureChatOpenAI(temperature=0.2,
                      openai_api_key=OPENAI_API_KEY,
                      model_name=MODEL_NAME,
                      deployment_name=DEPLOYMENT_NAME,
                      openai_api_base=OPENAI_API_BASE,
                      openai_api_version=OPENAI_API_VERSION)
  prompt = ChatPromptTemplate(messages=[
    SystemMessagePromptTemplate.from_template(prompt_trucking),
    MessagesPlaceholder(variable_name="chat_history"),
    HumanMessagePromptTemplate.from_template("{question}")
  ])
  memory = ConversationBufferMemory(memory_key="chat_history",
                                  return_messages=True)

  conversation = LLMChain(llm=llm, prompt=prompt, verbose=False, memory=memory)
  return conversation


