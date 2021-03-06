/**
 * ButtonLayer - Example
 *
 * ## ButtonLayer Example - Interactive Polygons
 *
 * Uses the ButtonLayer 'meta component' to add polygons
 * with border, hover, and active states.
 *
 * Toggle any polygon to 'zoom' into/out of it.
 */
import React from 'react'
import bbox from '@turf/bbox'
import {mapDefaults} from '@react-mapboxgl/docs'
import {MapGL} from '@react-mapboxgl/core'
import Hover from '@react-mapboxgl/hover'
import Toggle from '@react-mapboxgl/toggle'
import ButtonLayer from '../'

class Story extends React.Component {
  state = {
    activeName: null,
    bbox: mapDefaults.bbox
  }

  constructor () {
    super()
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle (feature, isOn) {
    if (isOn) {
      this.setState({
        activeName: feature.properties.name,
        bbox: bbox(feature)
      })
    } else {
      this.setState({
        activeName: null,
        bbox: mapDefaults.bbox
      })
    }
  }

  render () {
    return (
      <MapGL {...mapDefaults} bbox={this.state.bbox}>
        <ButtonLayer
          id='states'
          property='name'
          activeProperty={this.state.activeName}
          source={{
            type: 'geojson',
            data: 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces.geojson'
          }}
          base={{
            type: 'fill',
            paint: {
              'fill-color': '#627BC1',
              'fill-opacity': 0.5
            }
          }}
          border={{
            type: 'line',
            paint: {
              'line-color': '#627BC1',
              'line-width': 2
            }
          }}
          hover={{
            type: 'fill',
            paint: {
              'fill-color': '#627BC1',
              'fill-opacity': 1
            }
          }}
          hoverBorder={{
            type: 'line',
            paint: {
              'line-color': '#425BA1',
              'line-width': 2
            }
          }}
          active={{
            type: 'fill',
            paint: {
              'fill-color': '#ff0e0e',
              'fill-opacity': 0.4
            }
          }}
          activeBorder={{
            type: 'line',
            paint: {
              'line-color': '#ff0e0e',
              'line-width': 2
            }
          }}
        />
        <Hover layer='states' property='name'>
          {({properties: names}) => names[0] ? (
            <h2 style={{
              position: 'absolute',
              top: 10,
              left: 10,
              margin: 0,
              padding: 10,
              backgroundColor: '#333',
              color: '#ddd',
              boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)',
              zIndex: 10
            }}>
              {names[0]}
            </h2>
          ) : null}
        </Hover>
        <Toggle
          layer='states'
          property='name'
          onToggle={this.handleToggle}
          avoidDoubleClick
        />
      </MapGL>
    )
  }
}

export default Story
