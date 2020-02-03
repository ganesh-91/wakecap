import React, { Component, createRef } from 'react'
import MapComponent from './component/MapComponent';
import L from 'leaflet';
import CSVReader from 'react-csv-reader'
import 'leaflet/dist/leaflet.css';
import './App.css';
import PolygonComponent from './component/PolygonComponent';
import MarkerComponent from './component/MarkerComponent';
import { uniqueIdGenerator } from './utils';

const containerStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
}

const paraphraseOptions = {
  dynamicTyping: true,
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hasLocation: false,
      centerLatlng: {
        lat: 25.20039803034769,
        lng: 55.27743101119995
      },
      markerName: "",
      polygonName: "",
      addMarker: false,
      addPolygon: false,
      newLocSave: false,
      currPos: '',
      selectedObj: {},
      newPolygon: [],
      markersList: [
      ],
      polygonsList: [],
      toBeEditedObj: {}
    }

  }

  handleClick = (e) => {
    this.setState({ currPos: e.latlng, newLocPopup: true })
  }

  handleLocationFound = (e) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    })
  }

  updatePolygonNameChange = (e) => {
    this.setState({
      ...this.state,
      selectedObj: {
        ...this.state.selectedObj,
        name: e.target.value

      }
    })
  }

  updateMarker = () => {
    this.setState({
      ...this.state,
      markersList: this.state.markersList.map((el) => {
        return (el.id === this.state.selectedObj.id ? { id: this.state.selectedObj.id, position: this.state.selectedObj.position, name: this.state.selectedObj.name, type: "point" } : el)
      })
    });
    this.resetPolygonVal();
  }

  saveMarker = () => {
    this.setState({
      ...this.state,
      markersList: this.state.markersList.concat({ id: uniqueIdGenerator(), position: this.state.currPos, name: this.state.markerName, type: "point" }),
    })
    this.resetPolygonVal();
  }

  addMarkerFunc = () => {
    this.setState({ addMarker: true, addPolygon: false })
  }

  addPolygonFunc = () => {
    this.setState({ addPolygon: true, addMarker: false })
  }

  addLocToPolygon = () => {
    if (this.state.currPos !== "") {
      this.setState({
        ...this.state,
        newPolygon: this.state.newPolygon.concat(this.state.currPos)
      })
    }
  }

  resetPolygonVal = () => {
    this.setState({
      newPolygon: [],
      polygonName: '',
      markerName: '',
      selectedObj: {}
    })
  }

  savePolygon = () => {
    this.setState({
      ...this.state,
      polygonsList: this.state.polygonsList.concat({ name: this.state.polygonName, pos: this.state.newPolygon, id: uniqueIdGenerator(), type: "polygon" })
    })
    this.resetPolygonVal();
  }

  updatePolygon = () => {
    this.setState({
      ...this.state,
      polygonsList: this.state.polygonsList.map((el) => {
        return (el.id === this.state.selectedObj.id ? { id: el.id, name: this.state.selectedObj.name, pos: this.state.newPolygon, type: this.state.selectedObj.type } : el)
      })
    })
    this.resetPolygonVal();
  }

  cvsProcessor([name, type, ...pos]) {
    let len = pos.length;
    if (type === 'point') {
      let marker = {
        id: uniqueIdGenerator(),
        name,
        position: { lat: pos[1], lng: pos[0] },
        type
      }
      this.setState({ markersList: this.state.markersList.concat(marker) })
    }
    if (type === 'polygon') {
      let polygon = {
        id: uniqueIdGenerator(),
        name,
        pos: [],
        type
      }
      for (let ind = 0; ind < len; ind = ind + 2) {
        polygon.pos.push({ id: uniqueIdGenerator(), lat: pos[ind + 1], lng: pos[ind] });
      }
      this.setState({ polygonsList: this.state.polygonsList.concat(polygon) }, () => {
        console.log('this.state', this.state)
      })
    }

  }

  loadData = (data) => {
    data.map((obj) => {
      this.cvsProcessor(obj);
    })
  }

  polygonNameChange = (e) => {
    this.setState({ polygonName: e.target.value })
  }

  markerNameChange = (e) => {
    this.setState({ markerName: e.target.value })
  }

  updateMarkerNameChange = (e) => {
    this.setState({
      ...this.state,
      selectedObj: {
        ...this.state.selectedObj,
        name: e.target.value
      }
    })
  }

  replaceLoc = () => {
    if (this.state.currPos !== "") {
      this.setState({
        ...this.state,
        selectedObj: {
          ...this.state.selectedObj,
          position: this.state.currPos
        }
      }, () => {
        console.log(this.state)
      })
    }
  }

  editSelected = (obj) => {
    console.log('object', obj)
    this.setState({
      selectedObj: obj,
      newPolygon: obj.pos
    })
  }

  deleteMarker = (id) => {
    this.setState({
      markersList: this.state.markersList.filter((el) => {
        return (el.id !== id);
      })
    })
  }

  deletePolygon = (id) => {
    this.setState({
      polygonsList: this.state.polygonsList.filter((el) => {
        return (el.id !== id);
      })
    })
  }

  editPolygonVertex = (obj) => {
    if (this.state.currPos !== "") {
      this.setState({
        ...this.state,
        newPolygon: this.state.newPolygon.map((el) => {
          return (el.id === obj.id ? { id: obj.id, ...this.state.currPos } : el)
        })
      })
    }
  }

  deletePolygonVertex = (id) => {
    this.setState({
      ...this.state,
      newPolygon: this.state.selectedObj.pos.filter((el) => {
        return (el.id !== id)
      })
    })
  }

  componentDidMount() {
    let mapPlots = localStorage.getItem('mapPlots');
    if (mapPlots) {
      mapPlots = JSON.parse(mapPlots)
      this.setState({
        markersList: mapPlots.markersList,
        polygonsList: mapPlots.polygonsList
      })
    }
  }


  render() {
    console.log('this.state.polygonsList', this.state.polygonsList)
    return (
      <div style={{
        display: 'flex',
        flex: 2,
        flexDirection: 'row',
        height: '100%'
      }}>
        <div style={{
          display: 'flex',
          flex: 3,
          flexDirection: 'column'
        }}>
          <MapComponent
            centerLatlng={this.state.centerLatlng}
            handleClick={this.handleClick}
            handleLocationFound={this.handleLocationFound}
            markersList={this.state.markersList}
            polygonsList={this.state.polygonsList} />
        </div>
        <div style={{
          display: 'flex',
          flex: 2,
          flexDirection: 'column'
        }} className="page-container">
          <div>
            <div className="current-loc-container">
              Location
            <div>Long - {this.state.currPos.lng}</div>
              <div>Lat  - {this.state.currPos.lat}</div>
              {(this.state.currPos !== '' && !this.state.selectedObj.id) &&
                <><button className="btn btn-primary mr-5" onClick={this.addMarkerFunc}>Add Marker</button>
                  <button className="btn btn-primary" onClick={this.addPolygonFunc}>Add Polygon</button></>}
            </div>


            <div style={containerStyle}>
              <MarkerComponent
                replaceLoc={this.replaceLoc}
                updateMarkerNameChange={this.updateMarkerNameChange}
                updateMarker={this.updateMarker}
                currPos={this.state.currPos}
                selectedObj={this.state.selectedObj}
                editSelected={this.editSelected}
                deleteMarker={this.deleteMarker}
                markerNameChange={this.markerNameChange}
                saveMarker={this.saveMarker}
                markerName={this.state.markerName}
                markersList={this.state.markersList}
                addMarker={this.state.addMarker} />

              <PolygonComponent
                currPos={this.state.currPos}
                updatePolygonNameChange={this.updatePolygonNameChange}
                updatePolygon={this.updatePolygon}
                editPolygonVertex={this.editPolygonVertex}
                deletePolygonVertex={this.deletePolygonVertex}
                selectedObj={this.state.selectedObj}
                editSelected={this.editSelected}
                deletePolygon={this.deletePolygon}
                polygonsList={this.state.polygonsList}
                addPolygon={this.state.addPolygon}
                polygonNameChange={this.polygonNameChange}
                polygonName={this.state.polygonName}
                savePolygon={this.savePolygon}
                newPolygon={this.state.newPolygon}
                addLocToPolygon={this.addLocToPolygon} />
            </div>
          </div>

          <div className="mt-4">
            Select CSV with secret Death Star statistics
            <CSVReader
              cssClass="csv-reader-input"
              onFileLoaded={this.loadData}
              onError={er => console.log(er)}
              parserOptions={paraphraseOptions}
              inputId="csv-loader"
              inputStyle={{ color: 'red' }} />
          </div>

          <div className="text-right">
            <button type="button" onClick={this.saveToStorage} className="btn btn-primary">Save data</button>
          </div>

        </div>


      </div >
    );
  }

  saveToStorage = () => {
    localStorage.setItem('mapPlots', JSON.stringify({ markersList: this.state.markersList, polygonsList: this.state.polygonsList }));
  }

}

export default App;
// render(<App />, document.getElementById('root'));
