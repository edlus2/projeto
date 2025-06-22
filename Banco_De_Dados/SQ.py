#importa o modulo banco de dados
import sqlite3

#cria o banco de dado
processo_seletivo = sqlite3.connect('Processo.db')

#Cria o Curso para o banco de dado(ele sera como um escrito que ira escreve a informação no banco de dados)
cursor = processo_seletivo.cursor()

#1 VAMOR CRIA A SELEÇÃO DE CANDIDATO E JA INCLUIR AS COLUNAS E TIPOS DE CADA
'''
--- Estrutura da Tabela SELECAO_CANDIDATO ---

# Coluna: ID_CANDIDATO
# Tipo: INTEGER
# Regras: chave primária, Auto-incremento

# Coluna: NME_CANDIDATO
# Tipo: TEXT
# Regras: Nome do candidato

# Coluna: DAT_INSCRICAO
# Tipo: TIMESTAMP
# Regras: Valor padrão: data e hora da inserção
'''

processo_seletivo.execute('''
    CREATE TABLE IF NOT EXISTS SELECAO_CANDIDATO(
        ID_CANDIDATO INTEGER PRIMARY KEY AUTOINCREMENT,
        NME_CANDIDATO TEXT,
        DAT_INSCRICAO TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )                 
    ''')


#2 VAMOR CRIA A SELECAO_TESTE E INCLUIR AS COLUNAS E TIPOS DE CADA
'''
# --- Estrutura da Tabela em SELECAO_TESTE---

# Coluna: ID_TESTE
# Tipo: INTEGER
# Regras: Auto-incremento, chave primária

# Coluna: ID_CANDIDATO
# Tipo: INTEGER
# Regras: Chave estrangeira referenciando SELECAO_CANDIDATO(ID_CANDIDATO)

# Coluna: NUM_FIBONACCI
# Tipo: INTEGER
# Regras: Começa em 1, seguindo a sequência de Fibonacci

# Coluna: NUM_PAR
# Tipo: INTEGER (0 ou 1)
# Regras: Indica se o número é par (1 para verdadeiro, 0 para falso)

# Coluna: NUM_IMPAR
# Tipo: INTEGER (0 ou 1)
# Regras: Indica se o número é ímpar (1 para verdadeiro, 0 para falso)
'''

processo_seletivo.execute('''
    CREATE TABLE IF NOT EXISTS SELECAO_TESTE(
    ID_TESTE INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_CANDIDATO INTEGER REFERENCES SELECAO_CANDIDATO (ID_CANDIDATO),
    NUM_FIBONACCI INTEGER  ,
    NUM_PAR INTEGER CHECK (NUM_PAR IN (0, 1)),
    NUM_IMPAR INTEGER CHECK (NUM_IMPAR IN (0, 1))
    )                 
    ''')

cursor.execute("INSERT INTO SELECAO_CANDIDATO (NME_CANDIDATO) VALUES (?)", ('edgar',))

processo_seletivo.commit()