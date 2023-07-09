import React, { useState, useEffect } from 'react';
import './App.css';

export function Blocos() {
  const [numBlocos, setNumBlocos] = useState(3); // Número inicial de blocos
  const [blocos, setBlocos] = useState([]);
  const [activeBlockIndex, setActiveBlockIndex] = useState(null);

  useEffect(() => {
    // Gerar blocos iniciais com larguras igualmente divididas
    const initialBlocos = Array.from({ length: numBlocos }, (_, index) => ({
      id: String.fromCharCode(65 + index),
      largura: 100 / numBlocos,
    }));
    setBlocos(initialBlocos);
    setActiveBlockIndex(null);
  }, [numBlocos]);

  //Verifica se o número de blocos está entre 3 e 10
  const handleNumBlocosChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 3 && value <= 10) {
      setNumBlocos(value);
    }
  };

  // Iniciar o processo de arrastar e soltar
  const handleBlockDragStart = (event, index) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', index);
    setActiveBlockIndex(index);
  };

  // Função que lida com o processo de arrastar e soltar
  const handleBlockDrag = (event, index) => {
    const mouseX = event.pageX || (event.touches && event.touches[0].pageX);
    const boxPosition = event.currentTarget.getBoundingClientRect().left;
    if (mouseX < boxPosition) {
      // Diminuir o tamanho da caixa e aumentar o tamanho da caixa adjacente à direita
      if (activeBlockIndex === blocos.length - 1) {
        // Lidar com o caso em que a caixa ativa é a última caixa
        const containerWidth = event.currentTarget.parentNode.offsetWidth;
        const containerRight = event.currentTarget.parentNode.getBoundingClientRect().right;
        let newWidth = ((containerRight - mouseX) / containerWidth) * 100;
  
        // Calcular a largura restante com base na largura total de todas as outras caixas
        let otherBlocosTotalWidth = 0;
        blocos.forEach((block, i) => {
          if (i !== index && i !== index - 1) {
            otherBlocosTotalWidth += block.largura;
          }
        });
        let remainingWidth = 100 - newWidth - otherBlocosTotalWidth;
  
        // Garantir que a largura da penúltima caixa não seja menor que 10%
        if (remainingWidth < 10) {
          remainingWidth = 10;
          newWidth = 100 - remainingWidth - otherBlocosTotalWidth;
        }
  
        // Atualizar a largura das caixas somente se a nova largura da penúltima caixa for maior ou igual a 10%
        if (newWidth >= 10 && remainingWidth >= 10) {
          const updatedBlocos = [...blocos];
          updatedBlocos[index].largura = newWidth;
          if (index > 0 && remainingWidth >= 10) {
            updatedBlocos[index - 1].largura = remainingWidth;
          }
          setBlocos(updatedBlocos);
        }
      } else if (activeBlockIndex !== blocos.length - 1) {
        // Lidar com todos os outros casos
        const containerWidth = event.currentTarget.parentNode.offsetWidth;
        const containerLeft = event.currentTarget.parentNode.getBoundingClientRect().left;
        let newWidth = ((mouseX - containerLeft) / containerWidth) * 100;
  
        // Calcular a largura restante com base na largura total de todas as outras caixas
        let otherBlocosTotalWidth = 0;
        blocos.forEach((block, i) => {
          if (i !== index && i !== index + 1) {
            otherBlocosTotalWidth += block.largura;
          }
        });
        let remainingWidthRight = 100 - newWidth - otherBlocosTotalWidth;
  
        //Garantir que a largura da caixa à direita da caixa ativa não seja menor que 10%
        if (remainingWidthRight < 10) {
          remainingWidthRight = 10;
          newWidth = 100 - remainingWidthRight - otherBlocosTotalWidth;
        }
  
        // Atualizar a largura das caixas somente se a nova largura da caixa à direita ou à esquerda da caixa ativa for maior ou igual a 10%
        if (newWidth >= 10 && remainingWidthRight >= 10) {
          const updatedBlocos = [...blocos];
          updatedBlocos[index].largura = newWidth;
          if (index < updatedBlocos.length - 1) {
            updatedBlocos[index + 1].largura = remainingWidthRight;
          }
          setBlocos(updatedBlocos);
        }
      }
    } else if (mouseX > boxPosition) {
      // Aumentar o tamanho da caixa e diminuir o tamanho da caixa adjacente à direita
      if (activeBlockIndex === blocos.length - 1) {
        // Lidar com o caso em que a caixa ativa é a última caixa
        const containerWidth = event.currentTarget.parentNode.offsetWidth;
        const containerRight = event.currentTarget.parentNode.getBoundingClientRect().right;
        let newWidth = ((containerRight - mouseX) / containerWidth) * 100;
  
        // Calcular a largura restante com base na largura total de todas as outras caixas
        let otherBlocosTotalWidth = 0;
        blocos.forEach((block, i) => {
          if (i !== index && i !== index - 1) {
            otherBlocosTotalWidth += block.largura;
          }
        });
        let remainingWidth = 100 - newWidth - otherBlocosTotalWidth;
  
        // Garantir que a largura da penúltima caixa não seja menor que 10%
        if (remainingWidth < 10) {
          remainingWidth = 10;
          newWidth = 100 - remainingWidth - otherBlocosTotalWidth;
        }
  
        // Atualizar a largura das caixas somente se a nova largura da penúltima caixa for maior ou igual a 10%
        if (newWidth >= 10 && remainingWidth >= 10) {
          const updatedBlocos = [...blocos];
          updatedBlocos[index].largura = newWidth;
          if (index > 0 && remainingWidth >= 10) {
            updatedBlocos[index - 1].largura = remainingWidth;
          }
          setBlocos(updatedBlocos);
        }
      } else if (activeBlockIndex !== blocos.length - 1) {
        // Lidar com todos os outros casos
        const containerWidth = event.currentTarget.parentNode.offsetWidth;
        const containerLeft = event.currentTarget.parentNode.getBoundingClientRect().left;
        let newWidth = ((mouseX - containerLeft) / containerWidth) * 100;
  
        // Calcular a largura restante com base na largura total de todas as outras caixas
        let otherBlocosTotalWidth = 0;
        blocos.forEach((block, i) => {
          if (i !== index && i !== index + 1) {
            otherBlocosTotalWidth += block.largura;
          }
        });
        let remainingWidthRight = 100 - newWidth - otherBlocosTotalWidth;
  
        // Garantir que a largura da caixa à direita da caixa ativa não seja menor que 10%
        if (remainingWidthRight < 10) {
          remainingWidthRight = 10;
          newWidth = 100 - remainingWidthRight - otherBlocosTotalWidth;
        }
  
        // Atualizar a largura das caixas somente se a nova largura da caixa à direita da caixa ativa for maior ou igual a 10%
        if (newWidth >= 10 && remainingWidthRight >= 10) {
          const updatedBlocos = [...blocos];
          updatedBlocos[index].largura = newWidth;
          if (index < updatedBlocos.length - 1) {
            updatedBlocos[index + 1].largura = remainingWidthRight;
          }
          setBlocos(updatedBlocos);
        }
      }
    }
  };
  

  return (
    <div>
      <div>
        <label htmlFor="numBlocos">Quantidade de Blocos (mínimo 3, máximo 10):</label>
        <input
          id="numBlocos"
          type="number"
          min="3"
          max="10"
          value={numBlocos}
          onChange={handleNumBlocosChange}
        />
      </div>
      <div className='titulo'>
        Selecione o espaço alocado para cada disco:
      </div>
      <div className="wrapper">
        {blocos.map((bloco, index) => (
          <div
            key={bloco.id}
            className="box"
            style={{ flexBasis: `${bloco.largura}%` }}
            draggable
            onDragStart={(event) => handleBlockDragStart(event, index)}
            onDrag={(event) => handleBlockDrag(event, index)}
          >
            {`Disco ${bloco.id}`} <br></br>{`${bloco.largura.toFixed(0)}%`}
          </div>
        ))}
      </div>
    </div>
  );
}

export function App() {
  return (
    <div>
      <Blocos />
      <Blocos />
      <Blocos />
    </div>
  );
}
