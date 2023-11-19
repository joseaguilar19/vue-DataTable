import sys
import random

# Diccionario de respuestas predefinidas del chatbot
responses = {
    "hola": ["¡Hola!", "Hola, ¿en qué puedo ayudarte?"],
    "adios": ["Hasta luego", "¡Adiós!"],
    "nombre": ["Me llamo ChatBot", "Puedes llamarme ChatBot"],
    # Agrega más respuestas según sea necesario
}

# Lógica del chatbot
def get_response(user_message):
    user_message = user_message.lower()
    if user_message in responses:
        return random.choice(responses[user_message])
    else:
        return "Lo siento, no entiendo esa pregunta."

if __name__ == "__main__":
    # Ejemplo de uso para probar el chatbot
    # while True:
    #     user_input = input("Usuario: ")
    #     if user_input.lower() == 'salir':
    #         break
    #     response = get_response(user_input)
    #     print(f"ChatBot: {response}")
    # Obtener el mensaje del usuario desde los argumentos de la línea de comandos
    user_message = sys.argv[1] if len(sys.argv) > 1 else "Hola, ¿en qué puedo ayudarte?"

    # Lógica del chatbot
    response = get_response(user_message)
    print(f"Respuesta del ChatBot: {response}")