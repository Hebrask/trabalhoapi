from fastapi import FastAPI
from database import Base, engine
from routes import tasks

# Inicializar banco de dados
Base.metadata.create_all(bind=engine)

# Criar instância do FastAPI
app = FastAPI()

# Incluir rotas
app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])

@app.get("/")
def read_root():
    return {"message": "API de Tarefas funcionando!"}
