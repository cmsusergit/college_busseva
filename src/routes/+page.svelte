<script>
    import { onMount } from 'svelte';
    
    import pb from '$lib/db.js'
    let loading=false,loading_mesg=''
    export let data
    let selectedRouteRecord
    let feesRecord={
      "reciept_number": 0,
      "route": 0,
      "enrollment_number": "test",      
      "stu_name": "test",

      "stu_email":'',
      "stu_contact_number": "test",
      "parent_contact_number": "test",
      "bus_point": '',
      "course": '',
      "department": '',
      "sem": '',
      "amount_paid": 0.0,
      "amount_total": 0.0,
      "payment_date": new Date(),
      "academic_year": data?.ayearList?.find(ob=>ob.is_active==true)?.id??0,
      "user": 0
    }
    let semList=[1,2,3,4,5,6,7,8,9,10],departmentList=[]
    // let ayearList=[],semList=[1,2,3,4,5,6,7,8,9,10]
    // let routeList=[],routeBuspointList=[]
    // let courseList=[],departmentList=[]
    // let cityList=[]
    onMount(async()=>{
        // try{
        //     loading=true
        //     ayearList = await pb.collection('academic_year').getFullList({sort: '-created',})
        //     cityList = await pb.collection('city').getFullList({sort: 'name',})
        //     if(cityList && cityList.length>0){
        //       fetchRouteList(cityList[0].id)
        //     }
        //     feesRecord.academic_year=ayearList.find(ob=>ob.is_active==true)?.id
        //     console.log(feesRecord.academic_year);
        //     courseList = await pb.collection('course').getFullList({sort: 'name',})           
        // } 
        // catch(error){
        //     console.log(error)        
        // }
        // finally{
        //   loading=false
        // }
    })    
    const fetchDepartmentList=async(value)=>{
      try{
            if(value==''){
              departmentList=[]
              return
            }
            loading_mesg='Loading Department....'
            const query=`course='${value}'`
            departmentList = await pb.collection('department')
            .getFullList({sort: 'name',filter:query})
        }
        catch(error){
            console.log(error)        
        }
        finally{
          loading_mesg=''
        }      
    }
    const onRouteSelected=async(dt)=>{
      if(!dt)return
      try{
        const query1=`bus_point="${dt}"`
        console.log(query1)
        const temp1=await pb.collection('route_bus_point').getFirstListItem(query1,{expand:'route,route.traveller'})
        selectedRouteRecord=temp1?.expand?.route??''
      }catch(error){
        console.log('****',error)
        selectedRouteRecord=''
      }
    }
    // const fetchRouteList=async(value)=>{
    //   try{
    //         loading_mesg='Loading Routelist....'
    //         const query=`city='${value}'`

    //         routeList = await pb.collection('route')
    //         .getFullList({sort: 'name',filter:query})
    //     }
    //     catch(error){
    //         console.log(error)        
    //     }
    //     finally{
    //       loading_mesg=''
    //     }      
    // }
    // const fetchRoutePPList=async(value)=>{
    //   try{

    //         loading_mesg='Loading Route PP list....'
    //         const query=`route='${value}'`
    //         routeBuspointList = await pb.collection('bus_point')
    //         .getFullList({sort: 'name',filter:query})
    //     }
    //     catch(error){
    //         console.log(error)        
    //     }
    //     finally{
    //       loading_mesg=''
    //     }     
        
        





    // }
</script>

<div style="margin-top:1em;font-weight: bold;">
    {#if loading}
      <div style="background-color: white; color:teal;text-align: center;padding:4em;width:100%;" aria-busy={loading}>Please, Wait....</div>
    {:else}
      {#if loading_mesg!=''}
        <div style="color:teal;padding:2em;text-align: center;width:100%;" aria-busy={loading_mesg!=''}>{loading_mesg}</div>
      {/if}
      <form>
        <div>    
          <label for="academic_year">
            Academic Year<span style="margin-left:.2em;color:brown;">*</span>
            <select bind:value={feesRecord.academic_year} id="academic_year" required disabled>              
              {#each data?.ayearList as record}          
                <option value={record.id}>{record.name}</option>
              {/each}
            </select>  
          </label>
        </div>
        <div class="grid">
          <label for="enrollment_number">
            Enrollment Number<span style="margin-left:.2em;color:brown;">*</span>
            <input bind:value={feesRecord.enrollment_number} type="text" id="enrollment_number" name="enrollment_number" placeholder="Enrollment Number" required>
          </label>
          <label for="stu_name">
            Student Name<span style="margin-left:.2em;color:brown;">*</span>
            <input bind:value={feesRecord.stu_name} type="text" id="stu_name" name="stu_name" placeholder="Student Name" required>
          </label>
        </div>
        <div class="grid">
          <label for="stu_email">
            Student Email<span style="margin-left:.2em;color:brown;">*</span>
            <input bind:value={feesRecord.stu_email} type="email" id="stu_email" name="stu_email" placeholder="Student Email" required>
          </label>
          <label for="stu_contact_number">
            Student Contact<span style="margin-left:.2em;color:brown;">*</span>
            <input bind:value={feesRecord.stu_contact_number} type="text" id="stu_contact_number" name="stu_contact_number" placeholder="Student Contact" required>
          </label>    
          <label for="parent_contact_number">
            Parent Contact<span style="margin-left:.2em;color:brown;">*</span>
            <input bind:value={feesRecord.parent_contact_number} type="text" id="parent_contact_number" name="parent_contact_number" placeholder="Parent Contact" required>
          </label>
        </div>  
        <div class="grid">
          <label for="course">Course<span style="margin-left:.2em;color:brown;">*</span>
            <select on:change={(event)=>fetchDepartmentList(event.target.value)} bind:value={feesRecord.course} id="course" required>
              <option value="" selected>Select a Course</option>
              {#each data?.courseList as course}          
                <option value={course.id} >{course.name}</option>
              {/each}
            </select>  
          </label>
          <label for="department">Department<span style="margin-left:.2em;color:brown;" aria-busy={loading_mesg!=''}>*</span>
            <select bind:value={feesRecord.department} id="department" required>
              <option value="" selected>Select a Department</option>
              {#each departmentList as department}          
                <option value={department.id} >{department.name}</option>
              {/each}
            </select>  
          </label>    
          <label for="sem">Semestr<span style="margin-left:.2em;color:brown;">*</span>
            <select bind:value={feesRecord.sem} id="sem" required>
              <option value="" selected>Select a Semestr</option>
              {#each semList as sem}          
                <option value={sem}>{sem}</option>
              {/each}
            </select>  
          </label>    
        </div>        
        <div>
          <label for="city">City<span style="margin-left:.2em;color:brown;">*</span>
            <!-- <select on:change={(event)=>fetchRouteList(event.target.value)} id="city" required>
              {#each cityList as city}          
                <option value={city.id}>{city.name}</option>
              {/each}
            </select>   -->
            <select id="city" required>
              {#each data?.cityList as city}          
                <option value={city.id}>{city.name}</option>
              {/each}
            </select>  
          </label>
        </div>
        <div style="display:flex;flex-direction:column;width:100%;">
          <!-- <label for="route">Route<span style="margin-left:.2em;color:brown;">*</span>
            <select on:change={(event)=>fetchRoutePPList(event.target.value)} id="route" required>
              <option value="" selected>Select a Route</option>

              {#each routeList as route}          
                <option value={route.id}>{route.name} ({route.code})</option>
              {/each}
            </select>  
          </label> -->
          <!-- <label for="department">Bus Pickup Point<span style="margin-left:.2em;color:brown;">*</span> -->
            <label for="buspoint">Bus Pickup Point<span style="margin-left:.2em;color:brown;">*</span></label>                
            <!-- <AutoComplete onChange={onRouteSelected} id="buspoint" class="input" hideArrow='false' items="{data?.buspointList}" bind:selectedItem="{feesRecord.bus_point}" labelFieldName="name">
            </AutoComplete> -->
            <select on:change={event=>onRouteSelected(event.target.value)}  bind:value={feesRecord.bus_point} id="bus_point" required>
              <option value="" selected>Select a Route</option>              
              {#each data?.buspointList as bus_point}          
                <option value={bus_point.id}>{bus_point.name}</option>
              {/each}
            </select>  
          </div>
          {#if selectedRouteRecord}
            <div style="margin-top:2em;background: teal;color:white;padding:.5em;width:100%;">
              <b>Traveller Name:</b> {selectedRouteRecord?.expand?.traveller?.name}<br/>
              <b>Traveller Contact:</b> { selectedRouteRecord?.expand?.traveller?.contact_person} ({selectedRouteRecord?.expand?.traveller?.contact_number})<br/>
              <b>Route:</b> {selectedRouteRecord?.name} ({selectedRouteRecord?.code})              
            </div>
          {:else}
          <div style="margin-top:2em;background: orange;color:white;padding:.5em;width:100%;">          
            {#if feesRecord?.bus_point}  
              Route Nt Found For Selected Point {feesRecord?.bus_point?.name??''}
            {:else}
              Please, Select Bus Picup point 
            {/if}
          </div>
          {/if}
          <div>
            <label style="margin-top:2em;width:100%;" for="amount_paid">
              Amount Paid<span style="margin-left:.2em;color:brown;">*</span>
              <input bind:value={feesRecord.amount_paid} type="number" step='0.1' min=0 id="amount_paid" name="amount_paid" placeholder="Amount Paid" required>
            </label>          
          </div>
        <!-- <div class="grid">
          <label for="amount_paid">
            Amount Paid<span style="margin-left:.2em;color:brown;">*</span>
            <input bind:value={feesRecord.amount_paid} type="number" step='0.1' min=0 id="amount_paid" name="amount_paid" placeholder="Amount Paid" required>
          </label>
          <label for="amount_total">
            Amount Total<span style="margin-left:.2em;color:brown;">*</span>
            <input bind:value={feesRecord.amount_total} type="number" step='0.1' min=0 id="amount_total" name="amount_total" placeholder="Amount Total" required>
          </label>        
        </div> -->
      <button type="submit">Submit</button>
    </form>







    {/if}
</div>