export  const newJobForm =`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
  <script src="https://cdn.jsdelivr.net/npm/@pipedrive/app-extensions-sdk@0/dist/index.umd.js"></script>
</head>
<body>
<script>
    (async function() {
      const sdk = await new AppExtensionsSDK().initialize();
    })();
    console.log(sdk)
  </script>
<form>
    <!-- Client details -->
    <div>
        <h3>Client details</h3>
        <input type="text" placeholder="First name">
        <input type="text" placeholder="Last name">
        <input type="text" placeholder="Phone">
        <input type="email" placeholder="Email">
    </div>

    <!-- Job type -->
    <div>
        <h3>Job type</h3>
        <select>
            <option>Select job type</option>
        </select>
        <select>
            <option>GL Pinellas</option>
        </select>
        <textarea placeholder="Job description (optional)"></textarea>
    </div>

    <!-- Service location -->
    <div>
        <h3>Service location</h3>
        <input type="text" placeholder="Address">
        <input type="text" placeholder="City">
        <input type="text" placeholder="State">
        <select>
            <option>Tampa</option>
        </select>
    </div>

    <!-- Scheduled -->
    <div>
        <h3>Scheduled</h3>
        <input type="date" placeholder="mm/dd/yyyy">
        <input type="time" value="08:00">
        <input type="time" value="08:00">
        <select>
            <option>Select technician</option>
        </select>
    </div>

    <!-- Buttons -->
    <button type="submit">Create job</button>
    <button type="button">Save info</button>
</form>
</body>
</html>`