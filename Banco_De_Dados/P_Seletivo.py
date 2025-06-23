# Importa o modulo banco de dados
import sqlite3

# Cria o banco de dado
processo_seletivo = sqlite3.connect('Processo.db')

# Cria o Cursor para o banco de dado (ele será como um escritor que irá escrever a informação no banco de dados)
cursor = processo_seletivo.cursor()

# 1 VAMOS CRIAR A SELEÇÃO DE CANDIDATO E JA INCLUIR AS COLUNAS E TIPOS DE CADA
cursor.execute('''
    CREATE TABLE IF NOT EXISTS SELECAO_CANDIDATO(
        ID_CANDIDATO INTEGER PRIMARY KEY AUTOINCREMENT,
        NME_CANDIDATO TEXT,
        DAT_INSCRICAO TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )                 
''')

# 2 VAMOS CRIAR A SELECAO_TESTE E INCLUIR AS COLUNAS E TIPOS DE CADA
cursor.execute('''
    CREATE TABLE IF NOT EXISTS SELECAO_TESTE(
        ID_TESTE INTEGER PRIMARY KEY AUTOINCREMENT,
        ID_CANDIDATO INTEGER REFERENCES SELECAO_CANDIDATO (ID_CANDIDATO),
        NUM_FIBONACCI INTEGER,
        NUM_PAR INTEGER CHECK (NUM_PAR IN (0, 1)),
        NUM_IMPAR INTEGER CHECK (NUM_IMPAR IN (0, 1))
    )                 
''')

# Inserir um candidato fictício na tabela SELECAO_CANDIDATO
cursor.execute('''
    INSERT INTO SELECAO_CANDIDATO (NME_CANDIDATO) 
    VALUES ('Edgar Peixoto')
''')

# Pega o ID do candidato inserido
id_candidato = cursor.lastrowid  

# Função para gerar a sequência de Fibonacci
def gerar_fibonacci(n):
    fibonacci = [0, 1] 
    for i in range(2, n):
        proximo = fibonacci[i-1] + fibonacci[i-2]
        fibonacci.append(proximo)
    return fibonacci[1:]  # Removendo 0 do inicio para comerça por 1

# Gerar os 30 primeiros números da sequência de Fibonacci
fibonacci_sequence = gerar_fibonacci(30)

# Inserir os números de Fibonacci na tabela SELECAO_TESTE
for num in fibonacci_sequence:
    # Determinar se é par ou ímpar
    num_par = 1 if num % 2 == 0 else 0
    num_impar = 1 if num % 2 != 0 else 0
    
    cursor.execute('''
        INSERT INTO SELECAO_TESTE (ID_CANDIDATO, NUM_FIBONACCI, NUM_PAR, NUM_IMPAR)
        VALUES (?, ?, ?, ?)
    ''', (id_candidato, num, num_par, num_impar))

# Commit para salvar as alterações
processo_seletivo.commit()

# Poder de escolha do usuario caso queir aver somente 1 item
while True:
    print('''
    Escolha o que gostaria de ver:
    1 - Liste a sequência Fibonacci.
    2 - Liste os 5 maiores números da sequência inserida.
    3 - Conte quantos números pares e quantos ímpares foram armazenados.
    4 - Delete todos os números que forem maiores que 5000.
    5 - Liste a sequência Fibonacci.
    6 - Executar todas as opções.
    0 - Sair
    ''')
    
    #ira obter a escolha que o usuario ira seleciona sendo a certa ou errada
    escolha = input("Digite sua opção: ")
    
    try:
        escolha = int(escolha)
    except ValueError:
        print("Por favor, digite um número válido.")
        continue
    
    if escolha == 1:
        # Consulta 1: Listar a sequência Fibonacci
        print("\nConsulta 1: Lista completa da sequência Fibonacci:")
        cursor.execute('SELECT NUM_FIBONACCI FROM SELECAO_TESTE ORDER BY ID_TESTE')
        for row in cursor.fetchall():
            print(row[0])
            
    elif escolha == 2:
        # Consulta 2: Listar os 5 maiores números da sequência
        print("\nConsulta 2: Os 5 maiores números da sequência:")
        cursor.execute('SELECT NUM_FIBONACCI FROM SELECAO_TESTE ORDER BY NUM_FIBONACCI DESC LIMIT 5')
        for row in cursor.fetchall():
            print(row[0])
            
    elif escolha == 3:
        # Consulta 3: Contar quantos números pares e ímpares foram armazenados
        print("\nConsulta 3: Contagem de números pares e ímpares:")
        cursor.execute('SELECT SUM(NUM_PAR) AS total_pares, SUM(NUM_IMPAR) AS total_impares FROM SELECAO_TESTE')
        result = cursor.fetchone()
        print(f"Pares: {result[0]}, Ímpares: {result[1]}")
        
    elif escolha == 4:
        # Consulta 4: Deletar todos os números maiores que 5000
        cursor.execute('DELETE FROM SELECAO_TESTE WHERE NUM_FIBONACCI > 5000')
        processo_seletivo.commit()
        print(f"\nNúmeros maiores que 5000 removidos: {cursor.rowcount} registros afetados")
        
    elif escolha == 5:
        # Consulta 5: Listar novamente a sequência Fibonacci
        print("\nConsulta 5: Lista da sequência Fibonacci:")
        cursor.execute('SELECT NUM_FIBONACCI FROM SELECAO_TESTE ORDER BY ID_TESTE')
        for row in cursor.fetchall():
            print(row[0])
            
    elif escolha == 6:
        # Executar todas as opções
        print("\nExecutando todas as opções:")
        
        print("\n1. Lista completa da sequência Fibonacci:")
        cursor.execute('SELECT NUM_FIBONACCI FROM SELECAO_TESTE ORDER BY ID_TESTE')
        for row in cursor.fetchall():
            print(row[0])
        
        print("\n2. Os 5 maiores números da sequência:")
        cursor.execute('SELECT NUM_FIBONACCI FROM SELECAO_TESTE ORDER BY NUM_FIBONACCI DESC LIMIT 5')
        for row in cursor.fetchall():
            print(row[0])
        
        print("\n3. Contagem de números pares e ímpares:")
        cursor.execute('SELECT SUM(NUM_PAR) AS total_pares, SUM(NUM_IMPAR) AS total_impares FROM SELECAO_TESTE')
        result = cursor.fetchone()
        print(f"Pares: {result[0]}, Ímpares: {result[1]}")
        
        cursor.execute('DELETE FROM SELECAO_TESTE WHERE NUM_FIBONACCI > 5000')
        processo_seletivo.commit()
        print(f"\n4. Números maiores que 5000 removidos: {cursor.rowcount} registros afetados")
        
        print("\n5. Lista da sequência Fibonacci após remoção:")
        cursor.execute('SELECT NUM_FIBONACCI FROM SELECAO_TESTE ORDER BY ID_TESTE')
        for row in cursor.fetchall():
            print(row[0])
    
    #Caso saia do codigo ele ira informa a saida        
    elif escolha == 0:
        print("\033[1;32;40m Saindo do programa...\033[m")
        break
    
    #caso coloque algum numero incorreto ira mostra o erro e dara as opcão novamente
    else:
        print("\033[1;31m Opção inválida. Por favor, escolha uma opção de 0 a 6.\033[m")

# Fechar a conexão com o banco de dados
processo_seletivo.close()