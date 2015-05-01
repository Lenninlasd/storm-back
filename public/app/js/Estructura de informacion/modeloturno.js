{
	turno:{
		codigo_turno:'GH001',
		estado:'Pendiente por Atencion',
		// Proceso de Toma de toma de turno por parte del Cliente.
		toma_de_turno:{ 
			numero_linea_tigo:'3017054364',
			nombre_pantalla:'Juancho',
			motivo_visita:'cambio chip',
			hora_asignacion_tuno:'9:30:38'
		},
		// Proceso de Atencion del Turno por parte del Asesor.
		atencion_a_turno:{
            // Datos de la terminal que atiende el Turno
			terminal:{
				codigo_terminal:'TC003',
				// codigo_asesor:'TSjuan277',
				estado_terminal:'Ocupado',
				hora_inicio_atencion:'9:35:23',
				hora_fin_atencion:'9:45:03',
				tiempo_transcurrido:'50s'
			},
			// Datos del Cliente Atendido.
			cliente:{
				nombre:'Juan Jose Garcia',
				numero_documento:'1234131831',
				tipo_documento:'C.C'
			},
			// Datos de la atencion al turno
			infoTurno:{
				tiempo_espera:'123',
				area:'GENREAL',
				categoria_cliente:'CLIENTE GENERAL',
				servicio:'QUIERO REPONER MI CHIP / MI FACTURA / ACTUALIZACION DE DATOS',
				sub_servicio:'',
				observacion:''
			}
		}
	}
}
