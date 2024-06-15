<script>
    import pb from '$lib/db'
    
    import DataTable from '$lib/datatable.svelte'
    import _ from 'lodash'
    import { onMount } from 'svelte'
    import {receipt_print} from '$lib/reciept_print.js'
    import Profile from './profile.svelte'
    import { Button,Modal } from 'flowbite-svelte' 
    import * as XLSX from 'xlsx/xlsx.mjs'    
    let dataTableInit=[],currRecord=null
    let dataTable=[],loading=false

    export let is_auth
    const convertToDtstring = (dt)=>{             
            let day = '' + dt.getDate()
            let month = '' + (dt.getMonth() + 1)       
            let year = dt.getFullYear()
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
            return [year, month, day].join('-');
    }
    $:if(from_dt && to_dt){
        getDataByDuration()
    }
    let from_dt=convertToDtstring(new Date()),to_dt=convertToDtstring(new Date())
    let columnList=[
            {name:'Student Name',field:'stu_name',searchable:true,sortable:true},
            {name:'Enrollment/ID Number',field:'enrollment_number',searchable:true,sortable:true},
            {name:'Department',field:'department',selectable:true},
            {name:'Done By',field:'done_by',selectable:true},
            {name:'Cash',field:'cash'},
            {name:'QR Code',field:'qrcode'},
            {name:'Pickup/Drop Point',field:'bus_point',searchable:true},
            {name:'Payment Date',field:'payment_date',sortable:true},
            {slot:true}
        ]    
        onMount(async()=>{
            loading=true
            try {
            const temp1=`route.traveller.userid='${is_auth.id}'`
            const dt = await pb.collection('bus_fees').getFullList({
                expand:'user,course,department,route,bus_point,route.traveller',                                      
                filter:temp1,
                sort:'-created'
            })
            processData(dt)
        } catch (error) {                
            console.log(error)
        }
        finally{
            loading=false
        }
        })
        const getDataByDuration=()=>{
            console.log(from_dt)
            const tbl1=dataTableInit.filter(ob=>{
                const temp_pd=new Date(ob.payment_date)              
                temp_pd.setHours(0,0,0,0)
                const temp_fd=new Date(from_dt)
                const temp_td=new Date(to_dt)
                temp_fd.setHours(0,0,0,0)
                temp_td.setHours(0,0,0,0)            
                return (temp_pd>=temp_fd && temp_pd <= temp_td)
            })
            dataTable=[...tbl1]


            console.log('----',dataTable);
            //....
            //....
        }
        const processData=(dt)=>{
            dataTableInit=_.forEach(dt,(ob)=>{              
                ob['traveller']=ob.expand.route.expand.traveller.name
                ob['department']=ob.expand.department?.name
                ob['course']=ob.expand.course?.name
                ob['bus_point']=ob.expand.bus_point?.name
                ob['payment_date']=new Date(ob.payment_date).toLocaleDateString()
                ob['cash']=ob.payment_type=='CASH'?ob.amount_paid:0.0
                ob['qrcode']=ob.payment_type=='QRCODE'?ob.amount_paid:0.0
                ob['online']=ob.payment_type=='ONLINE'?ob.amount_paid:0.0
                ob['done_by']=ob.expand.user?.name
            })              
            getDataByDuration()
        }   
        const displayRecord=(record)=>{
            console.log('****',record)
            currRecord=record
        }
        const printReceipt=(record)=>{
            console.log('****',record)
            receipt_print(record.id)
        }
        const export2excel=()=>{
            loading=true
            let list1=new Array() 
            dataTable.map(ob=>{            
                    let temp=_.pick(ob,["receipt_number","payment_date","stu_name","enrollment_number","department","traveller","stu_contact_number","cash","qrcode","transaction_id","online","done_by"])
                    list1.push(temp)
            })
            const wsheet=XLSX.utils.json_to_sheet(list1)
            const wb=XLSX.utils.book_new()            
            XLSX.utils.book_append_sheet(wb,wsheet,"report")
            XLSX.writeFile(wb,"report.xlsx")
            loading=false
        }
    </script>
    {#if loading}
        <p class="text-4xl text-center">Loading....</p>
    {/if}

    <div class="flex md:flex-row flex-col">
        <div class="flex flex-col w-full md:w-1/2 m-1 px-1">
            <label for="from_dt" class="text-slate-800 px-1 py-1 font-bold">From Date</label>
            <input bind:value={from_dt} type="date" class="border rounded px-1 py-1 border-blue-400" name="from_dt" id="from_dt">
        </div>        
        <div class="flex flex-col w-full md:w-1/2 m-1 px-1">
            <label for="to_dt" class="text-slate-800 px-1 py-1 font-bold">To Date</label>
            <input bind:value={to_dt} type="date" class="border rounded px-1 py-1 border-blue-400" name="to_dt" id="to_dt">
        </div>
    </div>
    {#if dataTable && dataTable.length>0}
        <div class="flex justify-end">    
            <button on:click={export2excel} class="hover:bg-teal-400 bg-teal-500 px-4 py-2 text-white rounded">{loading?'Loading....':'Export Excel'}</button>

        </div>
        <DataTable data={dataTable} let:currRecord={record} columnlist={columnList}>    
            <div slot='action'>
                <div class="flex justify-center space-x-2 items-center">                
                    <button on:click={()=>displayRecord(record)} class="hover:bg-teal-400 bg-teal-500 p-1 text-white rounded">                          
                        <svg width="24" height="24" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16"> <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/> <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/> </svg>                                
                    </button>                    
                    <button on:click={()=>printReceipt(record)} class="hover:bg-green-700 bg-green-800 p-1 text-white rounded">                          
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm7-6a1 1 0 0 0 0 2h3c.34 0 .872.11 1.29.412.19.136.372.321.505.588H7.997a1 1 0 1 0 0 2h4.798a1.58 1.58 0 0 1-.504.588A2.352 2.352 0 0 1 11 12H7.997a1 1 0 0 0-.625 1.781l5.003 4a1 1 0 1 0 1.25-1.562L10.848 14h.15c.661 0 1.629-.19 2.46-.789A3.621 3.621 0 0 0 14.896 11H16a1 1 0 1 0 0-2h-1.104a3.81 3.81 0 0 0-.367-1H16a1 1 0 1 0 0-2H8z" clip-rule="evenodd"/></svg>
                    </button>
                </div>
            </div>
        </DataTable>
    {:else}
        <div class="text-2xl text-orange-800 p-2 text-center">Data Table is empty</div>
    {/if}
    <Modal bind:open={currRecord} title="Profile Detail">    
        <div>
            <Profile profile={currRecord}></Profile>
        </div>
        <svelte:fragment slot='footer'>               
            <div class="text-right w-full">
                <Button on:click={()=>currRecord=null} class="w-48 px-2">Close</Button>
            </div>
        </svelte:fragment>
    </Modal>









