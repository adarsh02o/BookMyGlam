// --- CONFIGURATION ---
async function initializeSupabase() {
    const response = await fetch('.env');
    const text = await response.text();
    const lines = text.split('\n');
    const env = {};
    for (const line of lines) {
        const [key, value] = line.split('=');
        if (key && value) {
            env[key.trim()] = value.trim();
        }
    }
    const supabaseUrl = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_KEY;
    return window.supabase.createClient(supabaseUrl, supabaseKey);
}

let supabase;
initializeSupabase().then(client => {
    supabase = client;
});

// --- THE FUNCTION ---
window.submitBooking = async function() {
    console.log("Button clicked!"); // Debugging check

    // 1. Get values from the HTML boxes
    const name = document.getElementById('name_box').value;
    const phone = document.getElementById('phone_box').value;
    const service = document.getElementById('service_box').value;
    const date = document.getElementById('date_box').value;
    const address = document.getElementById('address_box').value;

    // 2. Simple Validation (Optional: Stop if empty)
    if (!name || !phone) {
        alert("Please fill in your Name and Phone Number.");
        return;
    }

    // 3. Send to Supabase Table 'bookings'
    const { data, error } = await supabase
        .from('bookings')
        .insert([
            { 
                client_name: name,
                phone: phone,
                service_type: service,
                appt_date: date,
                address_notes: address
            }
        ]);

    // 4. Check result
    if (error) {
        console.error("Error:", error);
        alert("Booking Failed: " + error.message);
    } else {
        console.log("Success:", data);
        alert("Appointment Requested Successfully! We will call you soon.");
        // Optional: Clear the form
        document.getElementById('name_box').value = "";
        document.getElementById('phone_box').value = "";
        document.getElementById('service_box').value = "";
        document.getElementById('date_box').value = "";
        document.getElementById('address_box').value = "";
    }
}