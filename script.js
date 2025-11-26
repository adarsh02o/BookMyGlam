document.addEventListener('DOMContentLoaded', function() {
    // --- CONFIGURATION ---
    // IMPORTANT: For production, it's recommended to use environment variables to store your Supabase URL and Key.
    // This prevents sensitive information from being exposed in your client-side code.
    const supabaseUrl = 'https://igvsqjkhkohhaumwridm.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlndnNxamtoa29oaGF1bXdyaWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNTY5MjksImV4cCI6MjA3OTczMjkyOX0.-HAwwu5rGNOrUqiCzyFprp1b6ty_RFAKfDeV7eDHpC4';
    const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

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
});