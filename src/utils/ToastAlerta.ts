import { toast } from 'react-toastify';

export function ToastAlerta(mensagem: string, tipo: string) {
    const estiloComum = {
        position: 'top-right' as const,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'colored' as const,
        style: {
            fontFamily: 'monospace',
            fontWeight: 'bold',
            fontSize: '12px',
            textTransform: 'uppercase' as const,
            borderRadius: '0px',
            border: '4px solid #2b5c40',
            boxShadow: '4px 4px 0px #2b5c40',
            color: '#fffdf9',
        },
    };

    switch (tipo) {
        case 'sucesso':
            toast.success(mensagem, {
                ...estiloComum,
                style: {
                    ...estiloComum.style,
                    backgroundColor: '#3b7a57', 
                },
            });
            break;

        case 'erro':
            toast.error(mensagem, {
                ...estiloComum,
                style: {
                    ...estiloComum.style,
                    backgroundColor: '#ff7979', 
                },
            });
            break;

        case 'info':
        default:
            toast.info(mensagem, {
                ...estiloComum,
                style: {
                    ...estiloComum.style,
                    backgroundColor: '#2b5c40', 
                },
            });
            break;
    }
}