/**
 * Core - Events
 *
 * ## Map Events
 * Toggle any of the possible map events to start logging them.
 */
import React from 'react'
import _ from 'lodash'
import {action} from '@storybook/addon-actions'
import {mapDefaults, sanitizeMapEvent, Options, Checkbox} from '@react-mapboxgl/docs'
import {MapGL, MapEvents} from '../'

const eventHandlers = _.mapValues(MapEvents.propTypes, (t, name) => {
  return (e) => {
    action(name)(sanitizeMapEvent(e))
    console.log(e)
  }
})

class Story extends React.Component {
  state = {}
  render () {
    return (
      <div>
        <MapGL
          {...mapDefaults}
          {..._.pickBy(eventHandlers, (_, name) => {
            return this.state[name]
          })}
        />
        <Options>
          {_.map(eventHandlers, (_, name) => (
            <Checkbox
              key={name}
              name={name}
              onChange={(e) => {
                this.setState({[name]: e.currentTarget.checked})
              }}
              checked={this.state[name] || false}
            />
          ))}
        </Options>
      </div>
    )
  }
}

export default Story
