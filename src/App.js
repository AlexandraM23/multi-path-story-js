import './App.css';
import React from 'react';
import isNull from 'lodash/isNull'

import FormCell from './FormCell/FormCell.js'
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      tree: {
        parent: null,
        content: 'There once was a big bad wolf',
        children: {}
      },
      activeNode: {
        parent: null,
        content: 'There once was a big bad wolf',
        children: {}
      },
      top: '',
      right: '',
      bottom: '',
      left: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.startNewPath = this.startNewPath.bind(this)
    this.assignChildren = this.assignChildren.bind(this)
    this.backToStart = this.backToStart.bind(this)
    this.updateActiveNode = this.updateActiveNode.bind(this)
    this.backOneLevel = this.backOneLevel.bind(this)
  }

  handleInputChange = (event, position) => {
    event.preventDefault()

    this.setState(
      {
        [position]: event.target.value,
      }
    )
  }

  handleSubmit = (event, position) => {
    event.preventDefault()

    this.setState(
      {
        activeNode: this.updateActiveNode(this.state.activeNode, position)
      }
    )
  }

  updateActiveNode = (activeNode, position) => {
    const newNode = {
      content: this.state[position],
      parent: activeNode,
      children: activeNode.children[position] ? activeNode.children[position] : {},
    }

    activeNode.children = {
      ...activeNode.children,
      [position]: newNode
    }

    return activeNode
  }

  assignChildren = (tree, node) => {
    Object.assign(tree.children, node.children)
    return tree
  }

  backToStart = () => {
    this.setState({
      activeNode: this.state.tree,
      top: '',
      right: '',
      bottom: '',
      left: ''
    })
  }

  backOneLevel = () => {
    if (isNull(this.state.activeNode.parent)) {
      return
    }

    const parent = this.state.activeNode.parent
    this.setState({
      activeNode: parent,
      top: '',
      right: '',
      bottom: '',
      left: ''
    })
  }

  startNewPath = (node) => {
    const isRoot = isNull(this.state.activeNode.parent)
    const updatedState = {
      activeNode: node,
      top: '',
      left: '',
      right: '',
      bottom: ''
    }

    if (isRoot) {
      return this.setState({
        tree: this.assignChildren(this.state.tree, this.state.activeNode),
        ...updatedState
      })
    }

    this.setState({
      ...updatedState
    })
  }

  get formProps() {
    return {
      handleInputChange: this.handleInputChange,
      handleSubmit: this.handleSubmit,
      resetActiveNode: this.startNewPath,
      activeNode: this.state.activeNode,
    }
  }

  render() {
    return (
      <div className="App">
        <button
          className="backToStartButton"
          onClick={this.backToStart}
        >
          Back to start
        </button>
        <button
          className="backToStartButton"
          onClick={this.backOnelevel}
        >
          Back one level
        </button>
      <div className="cellContainer">
        <div className="cell"></div>
        <FormCell
          position='top'
          currentInput={this.state.top}
          {...this.formProps}
        />
        <div className="cell"></div>
        <FormCell
          position='left'
          currentInput={this.state.left}
          {...this.formProps}
        />
        <div className="cell">
          {this.state.activeNode.content}
        </div>
        <FormCell
          position='right'
          currentInput={this.state.right}
          {...this.formProps}
        />
        <div className="cell"></div>
        <FormCell
          position='bottom'
          currentInput={this.state.botttom}
          {...this.formProps}
        />
        <div className="cell"></div>
      </div>
      </div>
    );
  }
}

export default App;
