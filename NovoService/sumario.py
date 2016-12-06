def LoadQuestionTime (user, timeQuestions, idQuestion, timestamp):
	
	flagUserExists = False
	#Verificando se o usuario existe na lista do timeQuestions
	for userActives in timeQuestions:
		if userActives[0][0] == user:
			flagUserExists = True
		#adicionando na lista do recomender este usuario
	if flagUserExists == False:
		#print "if"
		timeQuestions.append([[user, idQuestion], [0,0,0], [0,0,0], [0,0,0]])

	if len(timeQuestions) > 0:
		i = 0
		for userActives in timeQuestions:
			if userActives[0][0] == user:
				if userActives[0][1] == idQuestion:
					if userActives[idQuestion][0] == 0:
						userActives[idQuestion][0] = timestamp	
					else:
						userActives[idQuestion][1] = (timestamp - userActives[idQuestion][0] + userActives[idQuestion][1])
						userActives[idQuestion][0] = timestamp
						userActives[idQuestion][2] = (userActives[idQuestion][1])/1000.0 
				else:
					userActives[idQuestion][0] = timestamp
					userActives[0][1] = idQuestion	
				#print userActives 	
		#print ""					
		#print feedback
		return timeQuestions
#print LoadSummarizerByUser("0001", "2000", "null", "conteudo", [])
#print LoadSummarizerByUser("0002", "9000", "null", "conteudo", ['0001;2000;0;conteudo'])
#print LoadSummarizerByUser("0001", "10000", "null", "conteudo", ['0001;2000;0;conteudo', '0002;9000;0;conteudo'])