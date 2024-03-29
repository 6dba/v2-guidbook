const URLS = {
	/* api.js */
	setObjectValues: 'http://81.161.220.59:8100/api/{objName}/?action=setVariables&request=developer',
	division_set: 'http://81.161.220.59:8100/api/division/?action=setVariables&request=developer',

	/* change_view.js */
	userView_get: 'http://81.161.220.59:8100/api/user_view/?action=get_views',

	/* contexmenu.js */
	userView_set: 'http://81.161.220.59:8100/api/user_view/?action=set_views',

	/* createNew.js */
	holdings: 'http://81.161.220.59:8100/api/holdings/?action=getList&request=developer',
	enterpriseTypes: 'http://81.161.220.59:8100/api/enterpriseTypes/?action=getList&request=developer',
	users: 'http://81.161.220.59:8100/api/users/?action=getList&request=developer',
	divisionTypes: 'http://81.161.220.59:8100/api/divisionTypes/?action=getList&request=developer',
	enterpriseList: 'http://81.161.220.59:8100/api/enterprise/?action=getList&request=developer',
	divisionShift: 'http://81.161.220.59:8100/api/divisionShift/?action=getList&request=developer',
	divisionAdjanced: 'http://81.161.220.59:8100/api/divisionAdjanced/?action=getList&request=developer',

	/* tree.js */
	structureRoot: 'http://81.161.220.59:8100/api/structureTest/?action=getData&pid=root&request=developer',
	structureTest: 'http://81.161.220.59:8100/api/structureTest/?action=getData&request=developer',
    childUrl: 'http://81.161.220.59:8100/api/structureTest/?action=getData&pid={id}&request=developer',
    
    /* dynamic URLs */
    usersEnterprise: 'http://81.161.220.59:8100/api/users/?action=getList&enterprise={id}&request=developer',
    
    /* show_edit.js */
    enterprise: 'http://81.161.220.59:8100/api/enterprise/?action=getVariables&id={id}&request=developer',
    division: 'http://81.161.220.59:8100/api/division/?action=getVariables&id={id}&request=developer',
    
    /* delete_object */
    deleteEnterprise: 'http://81.161.220.59:8100/api/enterprise/?action=drop&id={id}&request=developer',
    deleteDivision: 'http://81.161.220.59:8100/api/division/?action=drop&id={id}&request=developer'
    
};