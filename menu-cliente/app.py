from flask import Flask, render_template, request, jsonify
import requests

from services.gemini import preguntar
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

BACKEND = "https://proyectorestuarante-production.up.railway.app/api"


@app.route("/")
def inicio():

    try:
        respuesta = requests.get(f"{BACKEND}/menu/platos")
        platos = respuesta.json()

        if isinstance(platos, dict):
            platos = platos.get("data", [])

    except:
        platos = []

    try:
        respuesta = requests.get(f"{BACKEND}/bebidas")
        bebidas = respuesta.json()

        if isinstance(bebidas, dict):
            bebidas = bebidas.get("data", [])

    except:
        bebidas = []

    try:
        respuesta = requests.get(f"{BACKEND}/menu/combos")
        combos = respuesta.json()

        if isinstance(combos, dict):
            combos = combos.get("data", [])

    except:
        combos = []

    return render_template(
        "index.html",
        platos=platos,
        bebidas=bebidas,
        combos=combos
    )


@app.route("/preguntar", methods=["POST"])
def responder():

    datos = request.get_json()

    pregunta = datos.get("pregunta", "")

    # Obtener nuevamente el menú actualizado

    try:
        respuesta = requests.get(f"{BACKEND}/menu/platos")
        platos = respuesta.json()

        if isinstance(platos, dict):
            platos = platos.get("data", [])
    except:
        platos = []

    try:
        respuesta = requests.get(f"{BACKEND}/bebidas")
        bebidas = respuesta.json()

        if isinstance(bebidas, dict):
            bebidas = bebidas.get("data", [])
    except:
        bebidas = []

    try:
        respuesta = requests.get(f"{BACKEND}/menu/combos")
        combos = respuesta.json()

        if isinstance(combos, dict):
            combos = combos.get("data", [])
    except:
        combos = []

    prompt = f"""
Eres el asistente virtual del Restaurante HalyBV.

Responde únicamente preguntas relacionadas con el restaurante.

PLATOS:

{platos}

BEBIDAS:

{bebidas}

COMBOS:

{combos}

Si el usuario pregunta algo que no esté relacionado con el restaurante,
responde amablemente que solo puedes ayudar con el menú.

Pregunta del cliente:

{pregunta}
"""

    respuesta = preguntar(prompt)

    return jsonify({
        "respuesta": respuesta
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)