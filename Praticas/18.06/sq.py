import sqlite3

con = sqlite3.connect("banco.db")

cur = con.cursor()

cur.execute("CREATE TABLE IF NOT EXISTS carro(modelo, ano, valor)")

cur.execute("""      
    INSERT INTO carro VALUES
            ('HONDA', 2020, 65000),
            ('CHEVROLE', 2019, 62000)     
    """)
con.commit()

res = cur.execute("SELECT modelo FROM carro")
print(res.fetchall()) # Isso imprimirá o nome da tabela se ela existir