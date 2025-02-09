// Array de atalhos
const atalhos = [
    { 
        icon: 'https://i.imgur.com/sSeLWWi.png', 
        url: 'https://app.numerama.com.br/' 
    },
    { 
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0XvFduY7sDBknSh_lJd80OzsdZ_LaHL2w-g&s', 
        url: 'https://mail.google.com' 
    },
    { 
        icon: 'https://yt3.googleusercontent.com/u6H_TO65Atxmpc98XR-HcMFZ16o1UVppXqO7gj4hMUfz6H6YHjXZh4rLGTkyMHXNmeOfRFa0=s900-c-k-c0x00ffffff-no-rj', 
        url: 'https://www.youtube.com/' 
    },
    { 
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKhAtIU3_Dt3gffA3mJ4-VT9W63tt7UrsDXg&s', 
        url: 'https://twitch.tv/' 
    },
    { 
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWyAGVEy2gCLeUCpJB_6zV3GW3dakQ2_OTJA&s', 
        url: 'https://x.com/' 
    },
    { 
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR43RcsMyxliBMfpsFISAchszFZBbSOrhpYfw&s', 
        url: 'https://trello.com/' 
    },
    { 
        icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYYrXzs8W-W6W0xBZWQ6DUpudClrEIDLfaVA&s', 
        url: 'https://web.whatsapp.com/' 
    }
];

// Seleciona o container onde os atalhos serão adicionados
const container = document.getElementById('low');

// Percorre o array e cria os atalhos dinamicamente
atalhos.forEach(atalho => {
    // Cria o elemento <a>
    const link = document.createElement('a');
    link.href = atalho.url;
    link.classList.add('list-atalhos');
    link.target = '_blank'; // Abre em uma nova aba

    // Cria a imagem dentro do link
    const img = document.createElement('img');
    img.classList.add('list-atalhos-img');
    img.src = atalho.icon;
    img.alt = "Atalho";

    // Adiciona a imagem dentro do link
    link.appendChild(img);

    // Adiciona o link ao container
    container.appendChild(link);
});