import React, { Component } from 'react'

import { mySettings } from './../../settings.js'

import { ThreeDots } from 'react-loader-spinner'

import './css/loadingScreen.css'

export default class LoadingScreen extends Component {
  render() {
    return (
      <div fluid className="loading-container">
        <ThreeDots
					color={'rgba(29.02, 13.73, 35.29, 0.23137254901960785)'}
           height="20%"
           width="20%"
        />
      </div>
    )
  }
}
