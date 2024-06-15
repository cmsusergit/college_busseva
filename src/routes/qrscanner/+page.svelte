<script>
    import { page } from '$app/stores'

    import {Html5QrcodeScanner,Html5QrcodeScanType} from "html5-qrcode"
    import * as CryptoJS from 'crypto-js';
    import { onMount } from 'svelte';
    import Profile from '../../lib/component/profile.svelte'
    let currRecord
    const onScanSuccess=async(decodedText, decodedResult)=>{
        try {                    
            alert('****',decodedResult)
            const decryptedText=CryptoJS.AES.decrypt(decodedResult,"ihavesecret").toString(CryptoJS.enc.Utf8)

            currRecord = await pb.collection('bus_fees').getOne(decryptedText, {
                expand:'user,course,department,route,bus_point,route.traveller'
            });
            alert('----',JSON.stringify(currRecord))
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
</script>

<div>
    <div id="reader"/>


    {#if currRecord}
        {JSON.stringify(currRecord)}
        <div>
            <Profile :profileRecord={currRecord}></Profile>  
        </div>
    {/if}
</div>
