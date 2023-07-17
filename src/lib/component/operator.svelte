<script>
import DataTable from '$lib/datatable.svelte'

export let dataTable=[]
let currRecord
let columnList=[
        // {name:'Form ID',field:'id',searchable:true,sortable:true},
        // {name:'CollegeID',field:'student_college_id',searchable:true,sortable:true},
        // {name:'Merit Number',field:'merit_number',sortable:true},
        // {name:'Merit Percentile',field:'total_merit'},        
        // {name:'ACPC Merit Number',field:'acpc_meritnumber',sortable:true},
        // {name:'ACPC Application Number',field:'acpcnumber',sortable:true},
        // {name:'Name',field:'name',searchable:true,sortable:true},
        // {name:'Contact',field:'contact',searchable:true,sortable:true},
        // {name:'Email',sortable:true,field:'email',searchable:true},
        // {name:'Amission Category',field:'admission_category',selectable:true,sortable:true},
        // {name:'Course',field:'course',selectable:true,sortable:true},
        // {name:'Prov_Branch',field:'prov_branch',selectable:true,sortable:true},
        // {slot:true}
    ]
    // $:processData(data)    
    // $:{
    //     if(data.session?.user?.user_metadata)
    //         role=data.session?.user?.user_metadata.role
    // }
    // const processData=(data)=>{
    //     dataTable=_.forEach(data.dataTable,ob=>{
    //             ob['name']=(ob.title?ob.title:'')+' '+(ob.first_name?ob.first_name:'')+' '+(ob.middle_name?ob.middle_name:'')+' '+(ob.last_name?ob.last_name:'')            
    //             ob['course']=ob.Course?.name?ob.Course.name.trim():'-'
    //             ob['prov_branch']=ob.branch?.name?.trim()??'-'
    //         })         
    //     dataTable=_.orderBy(dataTable,['total_merit'],['desc'])
    //     _.forEach(_.filter(dataTable,ob=>ob.admission_category=='M' || ob.admission_category=='B'),(ob,indx)=>{      
    //         ob['merit_number']=indx+1
    //     })
    //     _.forEach(_.filter(dataTable,ob=>ob.admission_category=='N' || ob.admission_category=='B'),(ob,indx)=>{      
    //         ob['merit_number']=indx+1
    //     })
    // }   
</script>
{#if dataTable && dataTable.length>0}
    <DataTable data={dataTable} let:currRecord={record} columnlist={columnList}></DataTable>
{:else}
    <div class="text-2xl text-orange-800 p-2 text-center">Data Table is empty</div>
{/if}