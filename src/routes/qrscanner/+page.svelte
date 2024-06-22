<script>
    import db from '$lib/db'

    import {Html5Qrcode,Html5QrcodeScanner,Html5QrcodeScanType} from "html5-qrcode"
    import * as CryptoJS from 'crypto-js';
    import { onMount } from 'svelte';
    import {goto} from '$app/navigation'
    import Profile from '../../lib/component/profile.svelte'
    let currRecord,text
    let html5QrcodeScanner,enrollment
    let error_mesg


    $:{
        if(text) fetchDt1(text)
    }
    const onScanSuccess=(decodedText, decodedResult)=>{
            console.log('****',decodedResult.toString(),'****',decodedText)
            const decryptedText=CryptoJS.AES.decrypt(decodedText,"ihavesecret").toString(CryptoJS.enc.Utf8)
            text=decryptedText
            html5QrcodeScanner.clear()          
    }
    const fetchDt1=async(text)=>{
        try{
            currRecord = await db.collection('bus_fees').getOne(text, {
                expand:'user,course,department,route,bus_point,route.traveller',    
            });  
            currRecord['traveller']=currRecord.expand.route.expand.traveller.name
            currRecord['department']=currRecord.expand.department?.name
            currRecord['course']=currRecord.expand.course?.name
            currRecord['bus_point']=currRecord.expand.bus_point?.name
            currRecord['payment_date']=new Date(currRecord.payment_date).toLocaleDateString()
            currRecord['cash']=currRecord.payment_type=='CASH'?currRecord.amount_paid:0.0
            currRecord['qrcode']=currRecord.payment_type=='QRCODE'?currRecord.amount_paid:0.0
            currRecord['online']=currRecord.payment_type=='ONLINE'?currRecord.amount_paid:0.0
            currRecord['done_by']=currRecord.expand.user?.name
            currRecord['payment_status']=currRecord['payment_status']?'DONE':'PENDING'
            error_mesg=null
        } catch (error) {            
            console.log('****',error)
            error_mesg="Record Not Found in DB"
        }
    }
    const onScanFailure=(error)=>{
        console.log('****',error)
    }
    let config = {
        fps: 10,
        qrbox: {width: 100, height: 100},
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    };
    onMount(()=>{
        console.log('****');
        html5QrcodeScanner = new Html5QrcodeScanner("reader", config,false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);        
})

const onsubmit=async(ee)=>{        
        try{
            const text1=`enrollment_number="${enrollment}"`
            currRecord = await db.collection('bus_fees').getFirstListItem(text1, {
                expand:'user,course,department,route,bus_point,route.traveller'
            });         
            currRecord['traveller']=currRecord.expand.route.expand.traveller.name
            currRecord['department']=currRecord.expand.department?.name
            currRecord['course']=currRecord.expand.course?.name
            currRecord['bus_point']=currRecord.expand.bus_point?.name
            currRecord['payment_date']=new Date(currRecord.payment_date).toLocaleDateString()
            currRecord['cash']=currRecord.payment_type=='CASH'?currRecord.amount_paid:0.0
            currRecord['qrcode']=currRecord.payment_type=='QRCODE'?currRecord.amount_paid:0.0
            currRecord['online']=currRecord.payment_type=='ONLINE'?currRecord.amount_paid:0.0
            currRecord['done_by']=currRecord.expand.user?.name
            currRecord['payment_status']=currRecord['payment_status']?'DONE':'PENDING'
        }
        catch(error){
                console.log(`Error scanning file. Reason: ${error}`)
                error_mesg="Record Not Found in DB"
        }
    }
</script>
<div>
        {#if error_mesg}
        <div class="text-4xl bg-orange-700 text-center text-white p-4">             
            {error_mesg}
        </div>
        {/if}
    {#if !currRecord}
        <div id="reader" width="800"/>
        <form on:submit|preventDefault={onsubmit} class="mt-4 border">
            <div class="px-4  grid grid-cols-1 py-4">
                <label for="enrollment" class="text-lg font-bold">Enrollment</label>
                <input bind:value={enrollment} on:change={onchange} type="text" id="enrollment" required>        
                <button class="mt-2 bg-blue-700 text-white md:w-72 w-full md:justify-self-end font-bold hover:bg-blue-800 px-4 py-2" type="submit">Fetch Record</button>
            </div>
        </form>
    {:else}
        <div>
        <button on:click={()=>{currRecord='';text='';goto('/qrscanner');}} class="justify-self-end bg-blue-700 text-white float-right px-4 py-2 hover:bg-blue-800 font-bold">Goto SCANNER</button>
            <div class="p-2 float-none"></div>
            {#if currRecord.payment_status=="DONE"}
                <Profile profile={currRecord}></Profile>  
            {:else}
                <h1 class="p-2 text-2xl text-orange-700 text-center">Payment Status: Not Done</h1>
            {/if}
        </div>
    {/if}
</div>