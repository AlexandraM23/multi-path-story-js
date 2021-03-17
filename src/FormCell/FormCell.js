import React from 'react'
import isEmpty from 'lodash/isEmpty'
import '../App.css'

const FormCell = (props) => {
  const {
    position,
    handleInputChange,
    handleSubmit,
    resetActiveNode,
    activeNode,
    currentInput
  } = props

  const isNodePopulated = !isEmpty(activeNode.children[position])

  return (
    <div className='cell'>
      { !isNodePopulated &&
            <form onSubmit={(event) => handleSubmit(event, position)}>
              <input
                type='text'
                value={currentInput}
                onChange={(event) => handleInputChange(event, position)}
              />
                <input
                  type='submit'
                  value='Submit'
                />
            </form>
          }
          {
            isNodePopulated &&
            <button
              className="linkAppearance"
              onClick={() => resetActiveNode(activeNode.children[position], position)}
            >
              {activeNode.children[position].content}
            </button>
          }
    </div>
  )
}

export default FormCell