import React, { useState, useEffect, useContext } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import clienteAxios from '../../config/axios';
import Logo from '../../images/mui.png';
import AuthContext from '../../context/authentication/authContext';
import CsvDownloader from 'react-csv-downloader';
import Grid from '@material-ui/core/Grid';
import { Button, Card, Container, Row } from 'react-bootstrap';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#3B83BD',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

const Admin = () => {

  const [data, setData] = useState([]);
  const classes = useStyles();
  
  useEffect(() => {

    const getUsers = async () => {
        const response = await clienteAxios.get('/usuarios');
        setData(response.data.usuarios);
    }

    getUsers();
    // eslint-disable-next-line
    }, []);
  
  //Extraer la informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado, autenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    //eslint-disable-next-line
  }, []);

  const columns = [{
    id: 'nombre',
    displayName: 'Nombre'
  }, {
    id: 'edad',
    displayName: 'Edad'
  }, {
    id: 'posicion',
    displayName: 'PosicionSocial'
  }, {
    id: 'genero',
    displayName: 'Genero'
  }];


  return (  
    <>
    { !autenticado ? ( <h1>USUARIO NO VALIDO</h1>) : (
      <>
      <Card >
  <Card.Header> <img src={Logo} width = "10%"/></Card.Header>
  <Card.Body>
    <Card.Text>
      Bienvenido al Administrador, aqui puedes descargar el formato en CSV 
    <CsvDownloader
                  filename="usuarios"
                  separator=","
                  wrapColumnChar=""
                  columns={columns}
                  datas={data}
                  text="DESCARGAR"/>
    </Card.Text>
  </Card.Body>
</Card>
      
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Edad</StyledTableCell>
              <StyledTableCell>Posición Social</StyledTableCell>
              <StyledTableCell>Género</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.nombre}
                </StyledTableCell>
                <StyledTableCell >{row.edad}</StyledTableCell>
                {
                  row.posicion === 1 ? <StyledTableCell>Baja</StyledTableCell>
                  : row.posicion === 2 ? <StyledTableCell>Media</StyledTableCell>
                  : row.posicion === 3 ? <StyledTableCell>Alta</StyledTableCell>
                  : null
                }
                {
                  row.genero === 1 ? <StyledTableCell>Masculino</StyledTableCell>
                  : row.genero === 2 ? <StyledTableCell>Femenino</StyledTableCell>
                  : null
                }
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </>
    )}
    </>
  );
}
 
export default Admin;

