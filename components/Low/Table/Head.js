import React, { useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
	tooltip: {
		color: '#B4B4B4 !important',
		'&:hover': {
			color: '#C4C4C4'
		}
	}
}));

/**
 * 
 * @param {string} order Nombre del ordenamiento
 * @param {number} orderBy Columna que es ordenada
 * @param {func} onRequestSort Funcion que pide el ordenamiento
 * @param {array} columns Array de columnas
 */
function Head(props) {
	const classes = useStyles();
	const columns = props.columns;
	const { order, orderBy, onRequestSort } = props;

	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{columns.map(
					(row, index) => (
						<TableCell key={row[0]} sortDirection={orderBy === index ? order : false}>
							<Tooltip title="Ordenar" className={classes.tooltip}>
								<TableSortLabel
									active={orderBy === index}
									direction={order}
									onClick={createSortHandler(index)}
								>
									{row[1]}
								</TableSortLabel>
							</Tooltip>
						</TableCell>
					),
					this
				)}
			</TableRow>
		</TableHead>
	);
}

Head.propTypes = {
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.number.isRequired,
	columns: PropTypes.array.isRequired
};

export default Head;
