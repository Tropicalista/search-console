import axios from 'axios'

export default {
	/*
		GET 	/api/v1/dashboards
	*/
	getDashboards (){
		return axios.get( '/dashboards' );
	},

	/*
		GET 	/api/v1/dashboards/{slug}
	*/
	getDashboard ( slug ){
		return axios.get( '/dashboards/' + slug );
	},

	/*
		POST 	/api/v1/dashboards
	*/
	addDashboard ( dashboard ){
		return axios.post( '/dashboards',
			{ name: dashboard, widgets: [] },
		);
	},

	/*
	  PUT 	/api/v1/dashboards/{slug}
	*/
	editDashboard ( slug, payload ){
		return axios.put( '/dashboards/' + slug,
			payload
	  );
	},

	deleteDashboard ( slug ){
		return axios.delete( '/dashboards/' + slug );
	}
}