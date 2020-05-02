import sys
from socket import *
import threading

############# THREAD encarregat de enviar peticions ###############

#Envia peticions als altres dos nodes Fog de la Xarxa.
def enviaPeticio(ip,portRemotA, portRemotB):

	while 1:
	
		portRemot=''
		# Indiquem a quin dels altres dos servidors FOG volem enviar la peticio.
		servidorDesti = raw_input('Indica a quin servidor vols enviar una peticio: ( B o C ): ')
		if servidorDesti == 'B':
			portRemot = portRemotA
		elif servidorDesti == 'C':
			portRemot = portRemotB
		# Creem el Socket TCP (SOCK_STREAM)
		connectionSocket = socket(AF_INET, SOCK_STREAM)

		# Conectem el socket al servidor
		connectionSocket.connect((ip,portRemotA))

		#Enviem la peticio
		peticio = raw_input('Conexio amb el servidor correcta, indica la peticio que vols realitzar: ')
		connectionSocket.send(peticio)

		#Recivim la resposta a la peticio.
		resposta = connectionSocket.recv(2048)

		# Mostrem per pantalla la frase obtinguda.
		print ' Resposta obtinguda del servidor: ', resposta

		#Cerramos el socket
		connectionSocket.close()


def resolPeticio(connectionSocket,addr):

	#Recivim la peticio
	peticio = connectionSocket.recv(2048)
	print 'Hem obtingut la seguent peticio: ', peticio
	print ' '

	#Resolem la peticio
	resposta = raw_input('Resposta a la peticio obtinguda: ')
	print ' '

	#Enviem la resposta
	connectionSocket.send(resposta)


	#Tanca el socket
	connectionSocket.close()

 ########## MAIN ##############################################################

print ''
print ' ########### Benvingut a la inicialitzacio del servidor FOG. #############'
print ''

### MODIFICAR LA IP A LA DE LA MAQUINA DONDE CORREREMOS LOS NODOS
ip = '192.168.1.37'

portPropiA = int(raw_input('Indica el port sobre el que treballara el servidor FOG: '))
portRemotB = int(raw_input('Indica el port del servidor remot B: '))
portRemotC = int(raw_input('Indica el port del servidor remot C: '))

# Crea el socket TCP de acogida
serverSocket = socket(AF_INET,SOCK_STREAM)
# Enlazamos el socket a ese puerto
serverSocket.bind(('',portPropiA))

# El servidor fog  esta listo para escuchar hasta un maximo de 25 conexiones possibles.
serverSocket.listen(25)


print ' '
print 'El servidor es troba inicialitzat '
print ' '

#Creamos thread encargado de enviar peticiones
t1 = threading.Thread(target=enviaPeticio, args=(ip,portRemotB,portRemotC))
t1.start()

### Esperamos por conexiones entrantes indefinidamente.
while 1:

	# Esperamos a que llege una conexion
	# (Esta funcion devuelve un socket utilizado unicamente para esa conexion i su addr( ip i puerto)
	connectionSocket, addr = serverSocket.accept()

	#Thread para gesetionar esa peticion
	t2 = threading.Thread(target=resolPeticio, args=(connectionSocket,addr,))
	t2.start()













		

