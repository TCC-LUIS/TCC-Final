async function carregarLivros() {
  const token = localStorage.getItem('token')

  if (!token) {
    alert('Você precisa estar logado para acessar esta página.')
    window.location.href = '/login.html'
    return
  }

  try {
    const response = await fetch('http://localhost:4000/see', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        alert('Sessão expirada. Por favor, faça login novamente.')
        window.location.href = 'login.html'
      } else {
        throw new Error('Erro ao carregar livros')
      }
      return
    }
    // Obter os dados da resposta
    const { books, user } = await response.json()

    // Exibe as informações do usuário (nome e foto de perfil)
    const LogedIn = (document.getElementById('nomeUsuario').textContent =
      user.username || 'Usuário')
    if (user.profilePicture) {
      document.getElementById(
        'fotoPerfil'
      ).src = `data:image/jpeg;base64,${user.profilePicture}`
    }
    localStorage.setItem('nomeU', LogedIn)
    // Chama a função para exibir os livros
    exibirLivros(books)
  } catch (err) {
    console.error('Erro ao buscar livros:', err)
    alert('Erro ao carregar os livros.')
  }
}

// Função para exibir os livros
function exibirLivros(books) {
  const main = document.getElementById("livros-comuns")
  const finanças = document.getElementById("Financas")
  const romance = document.getElementById("Romance")
  const historia = document.getElementById("história")
  const livrosContainer = document.getElementById('livrosContainer')

  // Limpa o container antes de adicionar os novos livros
  livrosContainer.innerHTML = ''

  // Se não houver livros, exibe uma mensagem
  if (books.length === 0) {
    livrosContainer.innerHTML = '<p>Nenhum livro encontrado.</p>'
    return
  }

  // Exibe os livros na tela
  books.forEach(book => {
    const divLivro = document.createElement('div')
    if(book.id > 10) {
      divLivro.classList.add('livros-comuns')
    } else {
      divLivro.classList.add('livro')
    }
    divLivro.style.border = '1px solid #ddd'
    divLivro.style.padding = '10px'
    divLivro.style.marginBottom = '10px'
    
    
    /*// Adiciona o autor
    const autor = document.createElement('p')
    autor.textContent = `Autor: ${book.writer}` // Ajustado para `writer`
    divLivro.appendChild(autor)*/
    
    /*// Adiciona a editora
    const editora = document.createElement('p')
    editora.textContent = `Editora: ${book.publisher}` // Ajustado para `publisher`
    divLivro.appendChild(editora)*/
    
    /*// Adiciona o tipo
    const tipo = document.createElement('p')
    tipo.textContent = `Gênero: ${book.type}` // Ajustado para `type`
    divLivro.appendChild(tipo)*/
    
    /*// Adiciona o idioma
    const idioma = document.createElement('p')
    idioma.textContent = `Idioma: ${book.language}` // Ajustado para `language`
    divLivro.appendChild(idioma)*/
    
    // Adiciona a data de publicação
    /*const dataPublicacao = document.createElement('p')
    dataPublicacao.textContent = `Data de Publicação: ${new Date(
      book.date
      ).toLocaleDateString()}` // Ajustado para `date`
      divLivro.appendChild(dataPublicacao)
      
      // Adiciona o número de páginas
      const numeroPaginas = document.createElement('p')
      numeroPaginas.textContent = `Número de Páginas: ${book.pages}` // Ajustado para `pages`
      divLivro.appendChild(numeroPaginas)*/
      
      // Adiciona o preço
      const preco = document.createElement('h3')
      preco.textContent = `Preço: R$ ${book.price}` // Ajustado para `price`
      divLivro.appendChild(preco)
      
      // Adiciona a sinopse
      if (book.id > 10) {
        const sinopse = document.createElement('h4')
        sinopse.textContent = ` ` // Ajustado para `synopsis`
        divLivro.appendChild(sinopse)
      } else {
        const sinopse = document.createElement('h4')
        sinopse.textContent = `Sinopse: ${book.synopsis}` // Ajustado para `synopsis`
        divLivro.appendChild(sinopse)
      }
      // Verifica se há uma capa e a exibe, senão exibe uma mensagem padrão
      const capaElemento = document.createElement('div')
      if (book.cover) {
        const img = document.createElement('img')
        const imgURL = `data:image/jpeg;base64,${book.cover}`
        img.src = imgURL
        img.alt = book.title
        img.style.width = "200px";
        capaElemento.appendChild(img)
      } else {
        const semCapa = document.createElement('p')
        semCapa.textContent = 'Capa não disponível'
        capaElemento.appendChild(semCapa)
      }
      divLivro.appendChild(capaElemento)
      
      if(book.type === "Finanças") {
        finanças.appendChild(divLivro)
      }
      else if(book.type === "Romance") {
        romance.appendChild(divLivro)
      }
      else if(book.type === "história") {
        historia.appendChild(divLivro)
      } else if(book.id > 10) {
        main.appendChild(divLivro)
        // Adiciona a div do livro ao containe
      } else {
        livrosContainer.appendChild(divLivro)
      }
      // Adiciona o título
      const titulo = document.createElement('h3')
      titulo.textContent = book.title // Ajustado para `title`
      divLivro.appendChild(titulo)
    })
  }
  
  // Carrega os livros ao carregar a página
  window.onload = carregarLivros
  