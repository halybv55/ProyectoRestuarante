import os
from google import genai

client = genai.Client(api_key=os.environ.get("API_KEY"))

def preguntar(prompt):

    respuesta = client.models.generate_content(
    model="gemini-flash-latest",
    contents=prompt
)

    return respuesta.text