<script>
    import db from '$lib/db'

    import {Html5Qrcode,Html5QrcodeScanner,Html5QrcodeScanType} from "html5-qrcode"
    import * as CryptoJS from 'crypto-js';
    import { onMount } from 'svelte';
    import Profile from '../../lib/component/profile.svelte'
    let currRecord,text='test'

    const onScanSuccess=(decodedText, decodedResult)=>{
            console.log('****',decodedResult.toString(),'****',decodedText)
            const decryptedText=CryptoJS.AES.decrypt(decodedText,"ihavesecret").toString(CryptoJS.enc.Utf8)

            text=decryptedText
            fetchDt1(text)
    }
    const fetchDt1=async(text)=>{
        try{
            let currRecord = await db.collection('bus_fees').getOne(text, {
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
        } catch (error) {            
            console.log('****',error)
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
        let html5QrcodeScanner = new Html5QrcodeScanner("reader", config,false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);        
})
    const onchange=(ee)=>{        
        const html5QrCode = new Html5Qrcode("reader");
        html5QrCode.scanFile(ee.target.files[0], true)
            .then(async(decodedText) => {
                console.log(decodedText);
                const decryptedText=CryptoJS.AES.decrypt(decodedText.toString(),"ihavesecret").toString(CryptoJS.enc.Utf8)
                currRecord = await db.collection('bus_fees').getOne(decryptedText, {
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
            })
            .catch(err => {
                console.log(`Error scanning file. Reason: ${err}`)
            });
    }
</script>
<div>
    {text}
    {#if !currRecord}
        <div id="reader" width="800"/>
        <input on:change={onchange} type="file" name="" id="">
    {:else}
        <div>
            ----{JSON.stringify(currRecord)}----
            <Profile profile={currRecord}></Profile>  
        </div>
    {/if}
</div>



















