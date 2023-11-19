<template>
	<div>
		<h2>Servicio de ayuda</h2>
		<div class="chatbot-container">
			<div class="card card-w-title">

				<div class="questions-container">
					<div v-for="(question, index) in predefinedQuestions" :key="index">
						<Button class="p-button-rounded p-button-secondary mr-2 mb-2" @click="selectQuestion(question)">{{ question }}</Button>
					</div>
				</div>

			</div>

			<div class="chatbot">
				<div class="chat-container">
					<div v-for="(message, index) in messages" :key="index" class="message"
						:class="{ user: message.type === 'user', bot: message.type === 'bot' }">
						{{ message.text }}
					</div>
				</div>
				<div class="input-container">
					<span class="p-input-icon-right">
                            <InputText type="text" v-model="userMessage" @keyup.enter="sendMessage" placeholder="Escribe tu mensaje..." />
                            <i class="pi pi-search" />
                    </span>
				</div>
			</div>

		</div>


	</div>
</template>
  




<script>
export default {
	data() {
		return {
			messages: [],
			userMessage: "",
			predefinedQuestions: ["Hola", "¿Que es La Suculenta?", "¿Que venden?", "¿Que horarios manejan?", "¿Que tipos de alimentos realizan?", "¿Tienen servicio a domicilio?", "¿Cual es su contacto?"],
		};
	},
	methods: {
		sendMessage() {
			this.messages.push({ text: this.userMessage, type: "user" });
			const botResponse = this.getBotResponse(this.userMessage);
			this.messages.push({ text: botResponse, type: "bot" });
			this.userMessage = "";
		},
		getBotResponse(userMessage) {
			if (userMessage.includes("Hola")) {
				return "¡Hola! ¿En qué puedo ayudarte?";
			}
			else if (userMessage.includes("hola")) {
				return "¡Hola! ¿En qué puedo ayudarte?";
			}
			else if (userMessage.includes("ola")) {
				return "¡Hola! ¿En qué puedo ayudarte?";
			}
			else if (userMessage.includes("¿Que es La Suculenta?")) {
				return "Una cafeteria mexicana dedicada a complacer a los clientes de la mejor manera";
			}
			else if (userMessage.includes("¿Quienes son?")) {
				return "Una cafeteria mexicana dedicada a complacer a los clientes de la mejor manera";
			}else if (userMessage.includes("Menu")) {
				return "Vendemos bebidas frías y calientes de todo tipo al igual que alimentos";
			} else if (userMessage.includes("¿Que venden?")) {
				return "Vendemos bebidas frías y calientes de todo tipo al igual que alimentos";
			} else if (userMessage.includes("¿Que horarios manejan?")) {
				return "Cafeteria La Suculenta abre sus puertas a partir de las 9:00hrs a 20:00hrs de Lunes a Viernes y de 10:00hrs a 20:00hrs los días Sabados y Domingos ";
			} else if (userMessage.includes("¿Que tipos de alimentos realizan?")) {
				return "Ofrecemos una variedad de alimentos como los son Sandwich, panes dulces, galletas, pasteles, pays entre muchos otros";
			} else if (userMessage.includes("¿Tienen servicio a domicilio?")) {
				return "Aún no tenemos servicio a domicilio :(";
			} else if (userMessage.includes("¿Cual es su contacto?")) {
				return "Nos pueden preguntar o hacer pedidos via Whatsapp al numero: +52 962 227 3905";
			} else if (userMessage.includes("¿Que bebidas manejan?")) {
				return "Ofrecemos una gran variedad de café (Espresso, Americano, Latte, Capuccino, Mocaccino, Affogato, Bombón, Dalgona, Frapuccino, Helado)";
			} else if (userMessage.includes("¿Es un lugar para toda la familia?")) {
				return "Por supuesto que sí (:";
			} else { return "Lo siento, no entiendo esa pregunta. ¿Puedes reformularla?"; }


		},
		selectQuestion(question) {
			// Limpiar mensajes actuales
			this.messages = [];

			// Agregar la pregunta seleccionada al chatbot
			this.messages.push({ text: question, type: "user" });

			// Obtener la respuesta del chatbot según la pregunta seleccionada
			const botResponse = this.getBotResponse(question);
			this.messages.push({ text: botResponse, type: "bot" });
		},
	},
};
</script>
  
<style scoped>
/* Estilos del chatbot (puedes personalizar según tus necesidades) */
.chatbot-container {
	display: flex;
}

.questions-container {
	width: 200px;
	padding: 10px;
	border-right: 5px solid #ccc;
	margin-left: auto;
	/* Esto alinea el contenedor a la derecha */
}

.chatbot {
	flex: 1;
	border: 5px solid #ccc;
	border-radius: 5px;
	overflow: hidden;
	margin-left: 10px;
}

.chat-container {
	height: 300px;
	overflow-y: auto;
	padding: 20px;
}

.message {
	margin-bottom: 10px;
	padding: 8px;
	border-radius: 5px;

}

.user {
	background-color: #d4e1f4;
}

.bot {
	background-color: #e1fad4;
}

.input-container {
	padding: 10px;
	border-top: 1px solid #ccc;
}

input {
	width: 100%;
	padding: 8px;
	box-sizing: border-box;
}
</style>
  