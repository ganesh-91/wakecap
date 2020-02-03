import React, { Component, createRef } from 'react'
import {
  Map,
  Marker,
  Circle,
  CircleMarker,
  Polygon,
  Polyline,
  Popup,
  Rectangle,
  TileLayer,
  Tooltip
} from 'react-leaflet'
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const style = {
  width: "100%",
  height: "100%"
};


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const MyPopupMarker = ({ name, position }) => (
  <Marker position={position}>
    <Popup>{name}</Popup>
  </Marker>
)

const MyMarkersList = ({ markersList }) => {
  const items = markersList.map(({ id, ...props }) => (
    <MyPopupMarker key={id} {...props} />
  ))
  return <>{items}</>
}
class MapComponent extends Component {
  render() {
    return (
      <Map
        style={style}
        center={this.props.centerLatlng}
        length={4}
        onClick={this.props.handleClick}
        onLocationfound={this.props.handleLocationFound}
        zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyMarkersList bubblingMouseEvents={true} markersList={this.props.markersList} />
        {this.props.polygonsList.map((singlePolygon) => {
          return (
            <Polygon key={Math.random().toString()} color="purple" positions={singlePolygon.pos} >
              <Tooltip sticky>{singlePolygon.name}</Tooltip>
            </Polygon >
          );
        })}
      </Map>
    )
  }
}

export default MapComponent;