class dataHora {

    constructor() {
        this.agora = '';
        this.minute = '';

        this.getDataAtual();
        setInterval(this.getDataAtual.bind(this), 1000); 

        this.atualizarHora();
        this.atualizarData();
        this.atualizarSaudacao();
        this.atualizarClima();
    }

    getDataAtual() {
        this.agora = new Date();

        if(this.minute == '') {
            this.minute = this.agora.getMinutes()
        } else {
            if(this.agora.getMinutes() != this.minute) {
                this.minute = this.agora.getMinutes()
                this.atualizarHora();
            }
        }
    }

    atualizarHora() {
        let horas = this.agora.getHours().toString().padStart(2, '0');
        let minutos = this.agora.getMinutes().toString().padStart(2, '0');
        document.getElementById("hora").innerText = `${horas}:${minutos}`;
    }

    atualizarData() {
        const diasDaSemana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
        const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        const diaDaSemana = diasDaSemana[this.agora.getDay()];
        const diaDoMes = this.agora.getDate();
        const mes = meses[this.agora.getMonth()].toLowerCase();
        const ano = this.agora.getFullYear();
        document.getElementById("dia").innerText = `${diaDaSemana}, ${diaDoMes} de ${mes} de ${ano}`;
    }

    atualizarSaudacao() {
        let horas = this.agora.getHours();
        let saudacao = '';
        const user_name = 'Rian';

        
        if (horas >= 6 && horas <= 12)  {
            saudacao = `Bom dia, ${user_name}`;
        }
        else if (horas >= 13 && horas <= 18)  {
            saudacao = `Boa tarde, ${user_name}`;
        }
        else if ((horas >= 19 && horas <= 23) || (horas >= 0 && horas <= 5)) {
            saudacao = `Boa noite, ${user_name}`;
        }

        document.getElementById("salute").innerText = saudacao;

    }

    atualizarClima() {
        const apiKey = "c48d97cd1032cbacf0f20cc5292a985c"; // Substitua pela sua API Key
        const cidade = "São Paulo"; // Altere para a cidade desejada
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt`;

        fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error("Erro ao buscar os dados");
            }
            return response.json();
        })
        .then(data => {
            console.log(`Cidade: ${data.name}`);
            console.log(`Temperatura: ${data.main.temp}°C`);
            console.log(`Clima: ${data.weather[0].description}`);
        })
        .catch(error => console.error("Erro:", error));

            }

}


document.addEventListener("DOMContentLoaded", () => {
    const layout = new dataHora();
});