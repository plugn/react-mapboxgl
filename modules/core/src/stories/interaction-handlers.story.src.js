/**
 * Core - Interaction Handlers
 *
 * ## Turn Map Interaction Handlers On/Off
 * Toggle any of the map interaction handlers.
 */
import React from 'react'
import _ from 'lodash'
import {action} from '@storybook/addon-actions'
import {mapDefaults, Checkbox, Options} from '@react-mapboxgl/docs'
import {MapGL} from '../'

class Story extends React.Component {
  state = {
    scrollZoom: true,
    boxZoom: true,
    dragRotate: true,
    dragPan: true,
    keyboard: true,
    doubleClickZoom: true,
    touchZoomRotate: true
  }
  render () {
    return (
      <div>
        <MapGL
          {...mapDefaults}
          {...this.state}
        />
        <Options>
          {_.map(this.state, (checked, name) => (
            <Checkbox
              key={name}
              name={name}
              onChange={(e) => {
                action(name)(e.currentTarget.checked ? 'Enabled' : 'Disabled')
                this.setState({[name]: e.currentTarget.checked})
              }}
              checked={checked}
            />
          ))}
        </Options>
      </div>
    )
  }
}

export default Story
