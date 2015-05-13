{
	turno:{

		codigo_turno:'GH001',
		estado:'Pendiente por Atencion',
		fecha_creacion_turno:'',			
		toma_de_turno:{ // Proceso de Toma de toma de turno por parte del Cliente.
			numero_linea_tigo:'3017054364',
			nombre_pantalla:'Juancho',
			motivo_visita:'cambio chip'
		},

		atencion_a_turno:{ // Proceso de Atencion del Turno por parte del Asesor.

			asesor:{
				nombre_aesesor:'Juan Lius Guerra Orquesta', 
				id_asesor:'JLG114312167',
				sucursal:{
					nombre_sucursal:'TIGO CALLE 84',
					codigo_pos:'5000540',
					ciudad:'BARRANQUILLA',
					regional:'COSTA',
					terminal:'AB01'
					}
			},
			
			cliente:{ // Datos del Cliente Atendido.
				nombre:'Juan Jose Garcia',
				numero_documento:'1234131831',
				tipo_documento:'C.C'
			},
			
			infoTurno:{ // Datos de la atencion al turno
				tiempo_espera:'123',
				tiempo_llamado:'23',
				area:'GENREAL',
				categoria_cliente:'CLIENTE GENERAL',
				servicio:'QUIERO REPONER MI CHIP / MI FACTURA / ACTUALIZACION DE DATOS',
				sub_servicio:{
					nombre_subservicio:'Cambio de chip por perdida',
					descripcion:'Momento en el cual se realiza cambio de chip por perdida en el portal CRM.',
					numerador:'A',
					categoria:'Cambio de Chip'
				},
				observacion:'',
				tiempo_atencion:''
			}
		},
		
		puntualidad:''
	}
}
