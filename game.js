const TAMANHO = 3
const tabuleiro = []

var block = false
var player = false
var ganhador = false
var faltantes = TAMANHO * TAMANHO

function preencheTabuleiro () {
  for (let x = 0; x < TAMANHO * TAMANHO; x++) { tabuleiro[x] = undefined }
}

function criarTabuleiro () {
  if (block) return

  var html = '<table cellpading=0>'

  for (let linha = 0; linha < TAMANHO; linha++) {
    html += '<tr>'

    for (let coluna = 0; coluna < TAMANHO; coluna++) {
      html += '<td>'

      let valor = tabuleiro[coluna + linha * 3]

      if (valor === undefined) {
        html += '<button onclick="marcar('
        html += coluna + linha * 3
        html += ')"></button>'
      } else {
        html += valor
      }

      html += '</td>'
    }

    html += '</tr>'
  }

  html += '</table>'

  document.querySelector('#tabuleiro-div').innerHTML = html

  if (ganhador) {
    const marcacao = (player) ? 2 : 1
    html = 'PARABENS PLAYER '
    html += marcacao

    document.querySelector('#mensagem-ganhador').innerHTML = html
    block = true
  }

  if (!faltantes) {
    document.querySelector('#mensagem-ganhador').innerHTML = 'VELHA'
  }
}

function marcar (index) {
  if (player) tabuleiro[index] = 'X'
  else tabuleiro[index] = 'O'

  if (!conferir(index)) {
    player = !player
  }

  faltantes--

  criarTabuleiro()
}

function conferir (index) {
  if (index % 2 === 0) { // diagonais só ocorrem em index pares
    if (checarDiagonalPrincipal() || checarDiagonalSecundaria()) {
      ganhador = true
      return true
    }
  }

  if (checarHorizontal(index) || checarVertical(index)) {
    ganhador = true
    return true
  }

  return false
}

function checarHorizontal (index) {
  const marcacao = (player) ? 'X' : 'O'

  var horizontalPos = index % 3

  if (horizontalPos !== 0) { // first on row
    horizontalPos = index - horizontalPos
  } else {
    horizontalPos = index
  }

  for (let x = horizontalPos; x < horizontalPos + 3; x++) {
    if (tabuleiro[x] !== marcacao) return false
  }

  return true
}

function checarVertical (index) {
  const marcacao = (player) ? 'X' : 'O'

  const verticalIndex = (index % 3)

  for (let x = verticalIndex; x < TAMANHO * TAMANHO; x += 3) {
    if (tabuleiro[x] !== marcacao) return false
  }

  return true
}

function checarDiagonalPrincipal () {
  const marcacao = (player) ? 'X' : 'O'

  for (let x = 0; x < TAMANHO * TAMANHO; x += 4) {
    if (tabuleiro[x] !== marcacao) return false
  }

  return true
}

function checarDiagonalSecundaria () {
  const marcacao = (player) ? 'X' : 'O'

  for (let x = 2; x < 7; x += 2) {
    if (tabuleiro[x] !== marcacao) return false
  }

  return true
}

function jogar () {
  preencheTabuleiro()
  criarTabuleiro()
}

jogar()
