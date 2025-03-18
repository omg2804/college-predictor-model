document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("button");

    button.addEventListener("click", async () => {
        const rank = parseInt(document.getElementById("rank").value);
        const category = document.getElementById("category").value.trim(); // Trim whitespace
        const homeState = document.getElementById("homestate").value.trim();

        if (isNaN(rank) || !category || !homeState) {
            alert("Please fill all fields correctly!");
            return;
        }

        console.log(`🔎 Entered Data -> Rank: ${rank}, Category: ${category}, HomeState: ${homeState}`);

        try {
            const response = await fetch("http://localhost:5000/colleges");
            const colleges = await response.json();
            console.log("📌 Fetched Colleges:", colleges);

            let eligibleColleges = [];

            colleges.forEach(college => {
                console.log(`🔍 Checking ${college.name}...`);

                if (!college.cutoffRanks) {
                    console.warn(`⚠️ Missing cutoff data for ${college.name}`);
                    return;
                }

                for (let branch in college.cutoffRanks) {
                    const cutoffData = college.cutoffRanks[branch][category]; 

                    if (!cutoffData) continue;

                    console.log(`   🔢 Comparing Rank: ${rank} with Closing: ${cutoffData.closing}`);

                    if (rank <= cutoffData.closing) { // ✅ Fixed Logic
                        console.log(`✅ ${college.name} is eligible for ${branch}!`);
                        eligibleColleges.push({
                            name: college.name,
                            branch: branch,
                            rankRange: `${cutoffData.opening} - ${cutoffData.closing}`
                        });
                    }
                }
            });

            console.log("🎯 Final Eligible Colleges:", eligibleColleges);
            displayColleges(eligibleColleges);
        } catch (error) {
            console.error("❌ Error fetching data:", error);
        }
    });

    function displayColleges(colleges) {
        console.log("📌 Displaying Colleges on Page:", colleges); // Debugging log
    
        const collegeList = document.getElementById("college-list");
        const collegeResults = document.getElementById("college-results");
        collegeList.innerHTML = ""; // Clear previous results
    
        if (colleges.length === 0) {
            collegeList.innerHTML = "<li>No eligible colleges found.</li>";
            collegeResults.style.display = "block";
            return;
        }

        collegeResults.style.display = "block";
    
        colleges.forEach(college => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${college.name}</strong> - ${college.branch} (Cutoff: ${college.rankRange})`;
            collegeList.appendChild(li);
        });
    }
    
});
