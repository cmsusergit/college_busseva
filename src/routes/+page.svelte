<script>
    import pb from '$lib/db.js'

    import { Input,Alert,Button,Radio,Spinner,Select, Label } from 'flowbite-svelte'    
    let loading_dept=false,loading=false
    export let data
    let selectedRouteRecord
    let feesRecord={
      "reciept_number": 0,
      "route": 0,
      "enrollment_number": "",      
      "stu_name": "",

      "stu_email":'',
      "stu_contact_number": "",
      "parent_contact_number": "",
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
    const fetchDepartmentList=async(value)=>{
      try{
            if(value==''){
              departmentList=[]
              return
            }
            loading_dept=true
            const query=`course='${value}'`
            departmentList = await pb.collection('department')
            .getFullList({sort: 'name',filter:query})
        }
        catch(error){
            console.log(error)        
        }
        finally{
          loading_dept=false
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
</script>
{#if data?.status=='error'}
  <Alert dismissable>{data?.error}</Alert>
{/if}
<form class="m-4 md:m-2">
    <div class="mb-2">
      <Label for="academic_year" class="mb-2 text-lg">
        Academic Year<span class="ml-1 text-orange-700">*</span></Label>
        <Select bind:value={feesRecord.academic_year} disabled>
          {#each data?.ayearList as record}
            <option value={record.id}>{record.name}</option>
          {/each}
        </Select>
    </div>
    <div class="grid gap-4 mb-4 md:grid-cols-2">
      <div>        
        <Label for="enrollment_number" class="mb-2 text-lg">Enrollment/ID/Form Number<span class="ml-1 text-orange-700">*</span></Label>
        <Input bind:value={feesRecord.enrollment_number} type="text" id="enrollment_number" name="enrollment_number" required />
      </div>
      <div>
        <Label for="enrollment_number" class="mb-2 text-lg">Student Name<span class="ml-1 text-orange-700">*</span></Label>
        <Input bind:value={feesRecord.stu_name} type="text" id="stu_name" name="stu_name" required />
      </div>
    </div>
    <div class="grid gap-4 mb-4 md:grid-cols-{2+1}">
      <div>
        <Label class="mb-2 text-lg" for="stu_email">Student Email<span class="ml-1 text-orange-700">*</span></Label>
        <Input bind:value={feesRecord.stu_email} type="email" id="stu_email" name="stu_email" required/>      
      </div>
      <div>
        <Label class="mb-2 text-lg" for="stu_contact_number">Student Contact<span class="ml-1 text-orange-700">*</span></Label>
        <Input bind:value={feesRecord.stu_contact_number} type="text" id="stu_contact_number" name="stu_contact_number" required/>
      </div>
      <div>
        <Label class="mb-2 text-lg" for="parent_contact_number">Parent Contact<span class="ml-1 text-orange-700">*</span></Label>
        <Input bind:value={feesRecord.parent_contact_number} type="text" id="parent_contact_number" name="parent_contact_number" required/>
      </div>    
    </div>        
    <div class="grid gap-4 mb-4 md:grid-cols-{2+1}">
      <div>
          <Label class="mb-2 text-lg" for="course">Course
            <span class="ml-1 text-orange-700">*
              {#if loading_dept}
                <Spinner></Spinner>
              {/if}
            </span> 
          </Label>
          <Select on:change={(event)=>fetchDepartmentList(event.target.value)} bind:value={feesRecord.course} id="course" required>
            {#each data?.courseList as course}          
              <option value={course.id} >{course.name}</option>
            {/each}
          </Select>   
      </div>
      <div>
        <Label class="mb-2 text-lg" for="department">Department<span class="ml-1 text-orange-700">*</span></Label>
          <Select bind:value={feesRecord.department} id="department" required>
            {#each departmentList as department}          
              <option value={department.id} >{department.name}</option>
            {/each}
          </Select>  
      </div>
      <div>
        <Label class="mb-2 text-lg" for="sem">Semester<span class="ml-1 text-orange-700">*</span></Label>
          <Select bind:value={feesRecord.sem} id="sem" required>
            {#each semList as sem}          
              <option value={sem}>{sem}</option>
            {/each}
          </Select> 
      </div>
    </div>
    <div class="grid gap-4 mb-4 md:grid-cols-2">
      <div>
        <Label class="mb-2 text-lg" for="city">City<span class="ml-1 text-orange-700">*</span></Label>
        <Select id="city" required>
          {#each data?.cityList as city}          
            <option value={city.id}>{city.name}</option>
          {/each}
        </Select>  
      </div>    
      <div>
        <Label class="mb-2 text-lg" for="buspoint">Bus Pickup Point<span class="ml-1 text-orange-700">*</span></Label>                
        <Select on:change={event=>onRouteSelected(event.target.value)}  bind:value={feesRecord.bus_point} id="bus_point" required>
          {#each data?.buspointList as bus_point}          
            <option value={bus_point.id}>{bus_point.name}</option>
          {/each}
        </Select>  
      </div>     
    </div>
    {#if feesRecord.bus_point}
      {#if selectedRouteRecord}
        <div class="w-full mb-2 p-2 border rounded bg-blue-500 text-white">
          <b>Traveller Name:</b> {selectedRouteRecord?.expand?.traveller?.name}<br/>
          <b>Traveller Contact:</b> { selectedRouteRecord?.expand?.traveller?.contact_person} ({selectedRouteRecord?.expand?.traveller?.contact_number})<br/>
          <b>Route:</b> {selectedRouteRecord?.name} ({selectedRouteRecord?.code})              
        </div>                    
      {:else}
        <div class="w-full mb-2 p-2 border rounded bg-orange-700 text-white">
            Route Not Allocated for Selected Pickup Point
        </div>
      {/if}
    {/if}
    <div class="mb-2 grid gap-5 grid-cols-{data?.profile?2:1}">
      <div>
        <Label class="mb-2 text-lg">Payement Amount</Label>
        <Input></Input>
      </div>
      {#if data?.profile}
        <div>
          <Label class="mb-2 text-lg">Payment Method</Label>
          <div class="grid grid-cols-2 w-full md:w-1/4">
            <Radio color="blue" name="payment_type" class="w-full p-4">Cash</Radio>
            <Radio color="blue" name="payment_type" class="w-full p-4">Online</Radio>
          </div>
        </div>      
      {/if}
    </div>
    <div class="flex justify-end w-full p-2 mt-4 border rounded">
      <Button color="blue" class="w-full md:w-1/4" type="submit">Submit</Button>
    </div>
</form>



















