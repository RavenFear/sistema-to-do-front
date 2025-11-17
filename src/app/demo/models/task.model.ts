export interface TaskModel {
    id: number;
    nombre: string;
    descripcion: string;
    fechaRegistro: Date;
    fechaCompromiso: Date;
    status: string;

    // Campos adicionales para gestionar pedidos
    clienteNombre?: string;
    clienteTelefono?: string;
    clienteEmail?: string;
    direccionEnvio?: string;
    productos?: string;
}
