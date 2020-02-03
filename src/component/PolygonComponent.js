import React, { Component, createRef } from 'react'
import { uniqueIdGenerator } from '../utils';

const subContainerStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column'
}

class PolygonComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      toggleEdit: ''
    }
  }

  render() {
    return (
      <div style={subContainerStyle}>
        <div className="list-container">
          <ul className="list-group">
            <li className="list-group-item p-2 list-group-item-primary" >
              Polygons List List
            </li>
            {this.props.polygonsList.map((elm) => {
              return (
                <li key={elm.id} className={"list-group-item list-group-item-action pt-0 pb-0 pl-2 pr-0 " + (this.props.selectedObj.id === elm.id ? 'active' : '')}>
                  <div className="marker-title">{elm.name}</div>
                  <button
                    onClick={() => { this.props.editSelected(elm) }}
                    className="btn btn-primary input-group-text border-right-0 border-top-0 border-bottom-0">
                    <svg className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z" clipRule="evenodd"></path>
                      <path fillRule="evenodd" d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => { this.props.deletePolygon(elm.id) }}
                    className="btn btn-danger input-group-text border-right-0 border-top-0 border-bottom-0">
                    <svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.5 7.5A.5.5 0 018 8v6a.5.5 0 01-1 0V8a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V8a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V8z"></path>
                      <path fillRule="evenodd" d="M16.5 5a1 1 0 01-1 1H15v9a2 2 0 01-2 2H7a2 2 0 01-2-2V6h-.5a1 1 0 01-1-1V4a1 1 0 011-1H8a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM6.118 6L6 6.059V15a1 1 0 001 1h6a1 1 0 001-1V6.059L13.882 6H6.118zM4.5 5V4h11v1h-11z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>
          {this.props.selectedObj.type == 'polygon' &&
            <div>
              <div className="input-group mb-3 mt-2">
                <input type="text" className="form-control" onChange={this.props.updatePolygonNameChange} value={this.props.selectedObj.name} />
                <div className="input-group-append">
                  <button className="btn btn-primary action-button" onClick={this.props.updatePolygon}>Update</button>
                </div>
              </div>

              <ul className="list-group mt-4">
                <li className="list-group-item p-2 list-group-item-primary" >
                  Polygons Coordinates List
              </li>
                {this.props.newPolygon.map((elm) => {
                  return (
                    <li key={elm.id} className="list-group-item pt-0 pb-0 pl-2 pr-0">
                      <div className="marker-title"><span>{elm.lat}</span> , <span>{elm.lng}</span></div>
                      {this.state.toggleEdit !== elm.id ?
                        <button
                          onClick={() => { this.setState({ toggleEdit: elm.id }) }}
                          className="btn input-group-text border-right-0 border-top-0 border-bottom-0">
                          <svg className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z" clipRule="evenodd"></path>
                            <path fillRule="evenodd" d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z" clipRule="evenodd"></path>
                          </svg>
                        </button> :
                        <>
                          <button
                            onClick={() => { this.replaceClicked(elm) }}
                            className="btn btn-primary input-group-text border-right-0 border-top-0 border-bottom-0">
                            <svg className="bi bi-arrow-left-right" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M12.146 9.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L14.793 13l-2.647-2.646a.5.5 0 010-.708z" clipRule="evenodd"></path>
                              <path fillRule="evenodd" d="M4 13a.5.5 0 01.5-.5H15a.5.5 0 010 1H4.5A.5.5 0 014 13zm3.854-9.354a.5.5 0 010 .708L5.207 7l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clipRule="evenodd"></path>
                              <path fillRule="evenodd" d="M4.5 7a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clipRule="evenodd"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => { this.deletePolygonVertex(elm.id) }}
                            className="btn btn-danger input-group-text border-right-0 border-top-0 border-bottom-0">
                            <svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.5 7.5A.5.5 0 018 8v6a.5.5 0 01-1 0V8a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V8a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V8z"></path>
                              <path fillRule="evenodd" d="M16.5 5a1 1 0 01-1 1H15v9a2 2 0 01-2 2H7a2 2 0 01-2-2V6h-.5a1 1 0 01-1-1V4a1 1 0 011-1H8a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM6.118 6L6 6.059V15a1 1 0 001 1h6a1 1 0 001-1V6.059L13.882 6H6.118zM4.5 5V4h11v1h-11z" clipRule="evenodd"></path>
                            </svg>
                          </button>
                        </>}
                    </li>
                  );
                })}
              </ul>
              <div>
                {this.state.toggleEdit !== '' ? 'Select a location in map tp replace the current, and click on replace button' :
                  <button className="btn btn-primary mt-2" onClick={this.props.addLocToPolygon}>Add Location to Polygon</button>}
              </div>
            </div>
          }

          {(this.props.addPolygon && !this.props.selectedObj.id) &&
            <div>
              <div className="input-group mb-3 mt-2">
                <input type="text" className="form-control" onChange={this.props.polygonNameChange} value={this.props.polygonName} />
                <div className="input-group-append">
                  <button className="btn btn-primary action-button" onClick={this.props.savePolygon}>Save</button>
                </div>
              </div>

              <ul className="list-group mt-4">
                <li className="list-group-item p-2 list-group-item-primary" >
                  Polygons Coordinates List
                </li>
                {this.props.newPolygon.map((elm) => {
                  return (
                    <li key={elm.id} className="list-group-item pt-0 pb-0 pl-2 pr-0">
                      <div className="marker-title"><span>{elm.lat}</span> , <span>{elm.lng}</span></div>
                      <button className="btn btn-primary input-group-text border-right-0 border-top-0 border-bottom-0">
                        <svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z" clipRule="evenodd"></path>
                          <path fillRule="evenodd" d="M14.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z" clipRule="evenodd"></path>
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div>
                <button className="btn btn-primary mt-2" onClick={this.props.addLocToPolygon}>Add Location to Polygon</button>
              </div>
            </div>
          }
        </div>
      </div >
    );
  }

  replaceClicked = (elm) => {
    if (this.props.currPos !== "") {
      this.setState({ toggleEdit: '' })
      this.props.editPolygonVertex(elm);
    }
  }

  deletePolygonVertex = (id) => {
    this.setState({ toggleEdit: '' })
    this.props.deletePolygonVertex(id);
  }
}

export default PolygonComponent;
// render(<App />, document.getElementById('root'));
