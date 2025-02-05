import sqlite3
from sqlite3 import Error

# Función para crear una conexión con la base de datos SQLite
def create_connection():
    try:
        conn = sqlite3.connect("inventario.db")
        print("Conexión exitosa a la base de datos")
        return conn
    except Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None

# Función para crear la tabla de productos en la base de datos
def create_table(conn):
    try:
        query = '''CREATE TABLE IF NOT EXISTS productos (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        nombre TEXT NOT NULL,
                        cantidad INTEGER NOT NULL,
                        precio REAL NOT NULL
                    );'''
        conn.execute(query)
        print("Tabla de productos creada exitosamente")
    except Error as e:
        print(f"Error al crear la tabla: {e}")

# Función para agregar un producto
def agregar_producto(conn, nombre, cantidad, precio):
    try:
        query = '''INSERT INTO productos (nombre, cantidad, precio)
                   VALUES (?, ?, ?);'''
        conn.execute(query, (nombre, cantidad, precio))
        conn.commit()
        print("Producto agregado exitosamente")
    except Error as e:
        print(f"Error al agregar el producto: {e}")

# Función para eliminar un producto
def eliminar_producto(conn, producto_id):
    try:
        query = '''DELETE FROM productos WHERE id = ?;'''
        conn.execute(query, (producto_id,))
        conn.commit()
        print(f"Producto con ID {producto_id} eliminado exitosamente")
    except Error as e:
        print(f"Error al eliminar el producto: {e}")

# Función para listar todos los productos
def listar_productos(conn):
    try:
        query = '''SELECT * FROM productos;'''
        cursor = conn.execute(query)
        productos = cursor.fetchall()
        if productos:
            print("\nListado de productos:")
            for producto in productos:
                print(f"ID: {producto[0]}, Nombre: {producto[1]}, Cantidad: {producto[2]}, Precio: {producto[3]}")
        else:
            print("No hay productos en el inventario.")
    except Error as e:
        print(f"Error al listar los productos: {e}")

# Función para buscar productos por nombre
def buscar_producto(conn, nombre):
    try:
        query = '''SELECT * FROM productos WHERE nombre LIKE ?;'''
        cursor = conn.execute(query, ('%' + nombre + '%',))
        productos = cursor.fetchall()
        if productos:
            print(f"\nProductos que coinciden con '{nombre}':")
            for producto in productos:
                print(f"ID: {producto[0]}, Nombre: {producto[1]}, Cantidad: {producto[2]}, Precio: {producto[3]}")
        else:
            print(f"No se encontraron productos con el nombre '{nombre}'.")
    except Error as e:
        print(f"Error al buscar el producto: {e}")

# Función para actualizar la cantidad de un producto
def actualizar_cantidad(conn, producto_id, nueva_cantidad):
    try:
        query = '''UPDATE productos SET cantidad = ? WHERE id = ?;'''
        conn.execute(query, (nueva_cantidad, producto_id))
        conn.commit()
        print(f"Cantidad del producto con ID {producto_id} actualizada a {nueva_cantidad}")
    except Error as e:
        print(f"Error al actualizar la cantidad: {e}")

# Función principal para interactuar con el usuario
def menu():
    conn = create_connection()
    if conn is None:
        return
    
    create_table(conn)

    while True:
        print("\nMenu de opciones:")
        print("1. Agregar producto")
        print("2. Eliminar producto")
        print("3. Listar productos")
        print("4. Buscar producto por nombre")
        print("5. Actualizar cantidad de un producto")
        print("6. Salir")
        
        opcion = input("Selecciona una opción: ")

        if opcion == '1':
            nombre = input("Nombre del producto: ")
            cantidad = int(input("Cantidad del producto: "))
            precio = float(input("Precio del producto: "))
            agregar_producto(conn, nombre, cantidad, precio)
        elif opcion == '2':
            producto_id = int(input("ID del producto a eliminar: "))
            eliminar_producto(conn, producto_id)
        elif opcion == '3':
            listar_productos(conn)
        elif opcion == '4':
            nombre = input("Nombre del producto a buscar: ")
            buscar_producto(conn, nombre)
        elif opcion == '5':
            producto_id = int(input("ID del producto a actualizar: "))
            nueva_cantidad = int(input("Nueva cantidad: "))
            actualizar_cantidad(conn, producto_id, nueva_cantidad)
        elif opcion == '6':
            print("Saliendo del programa...")
            conn.close()
            break
        else:
            print("Opción no válida. Intenta de nuevo.")

# Ejecutar el menú principal
if __name__ == '__main__':
    menu()
