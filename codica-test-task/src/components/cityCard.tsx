import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { citiesSlice, IWeatherInfo, selectCities } from '../store/citiesSlice';
import { goTo, getSavedCities, getWeather, updateWeather } from "../services/getData";
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

export function CitiesComponent() {
    const dispatch = useDispatch();
    const savedCities = useSelector(selectCities);
    const [cityName, setCityName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(getSavedCities());
    }, [])

    return (
    <Container className="cities">
      <div className="add-city">
        <TextField id="standard-basic" className="field field-city" label="City" variant="standard" value={ cityName } onChange={ (e: { target: { value: any; }; }) => setCityName(e.target.value) }/>
        <Button variant="outlined"  onClick={ () => dispatch(getWeather(cityName)) } startIcon={<AddIcon />}>
        Add
      </Button>
      </div>
      <Row>
        {
          savedCities.map( (item: { name: string, temp: string, weather: IWeatherInfo, lat: string, lon: string }) => {
            return <Col sm={ 4 } key={ item.name }>
                <Card onClick={ (e: any) => dispatch(goTo(e, item.name, navigate)) }>
                  <h3>{ item.name }</h3>
                    <Card.Body>
                      <Card.Text>{ Number.parseFloat(item.weather.temp).toFixed(0) } &#176;C, { item.weather.sky }</Card.Text>
                      <div>
                        <RefreshIcon className="icon icon-refresh" onClick={ (e: any) => dispatch(updateWeather(e, item.lat, item.lon)) }/>
                        <DeleteOutlinedIcon className="icon icon-delete" onClick={ (e: any) => dispatch(citiesSlice.actions.deleteCity({ event: e, name: item.name })) }/>
                      </div>
                    </Card.Body>
                </Card>
            </Col>
          })
        }
      </Row>
    </Container>)
}