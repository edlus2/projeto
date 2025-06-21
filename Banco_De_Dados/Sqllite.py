import sqlite3

connection = sqlite3.connect('bancodedados.db')

connection.execute('''
    CREATE TABLE IF NOT EXISTS pessoa(
        cod INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        idade INTEGER
    )                       
''')

cursor = connection.cursor()
def adicionar(nome, idade):
    print("--------------DAdos-----------")
    cursor.execute("INSERT INTO pessoa (nome, idade) VALUES (?, ?)", (nome , idade ))
    connection.commit()
    print("\n")
    
def ler():
    print('----------leitura----------')
    escritor = cursor.execute("SELECT * FROM pessoa").fetchall()
    for dados in escritor:
        print(dados)
    print("\n")
    
def atualizar(cod, nome, idade):
    print('-----atualizado-----')
    cursor.execute('UPDATE pessoa SET nome = ?,indade = ? WHERE cod = ?',(nome , idade , cod))
    connection.commit()
    print()

def deletar(cod):
    print('-----Delete-----')
    cursor.execute("DELETE FROM pessoa WHERE cod = ?", (cod,))
    connection.commit()
    print("\n")    
    
ler()