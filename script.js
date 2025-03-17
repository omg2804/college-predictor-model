document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("button");

    button.addEventListener("click", async () => {
        const rank = parseInt(document.getElementById("rank").value);
        const category = document.getElementById("category").value;
        const homeState = document.getElementById("homestate").value;

        if (isNaN(rank) || !category || !homeState) {
            alert("Please fill all fields correctly!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/colleges");
            const colleges = await response.json();

            console.log("📌 Fetched Colleges:", colleges);

            let eligibleColleges = colleges.filter(college => {
                console.log(`🔍 Checking ${college.name}...`);

                if (!college.cutoffRanks) {
                    console.warn(`⚠️ Missing cutoff data for ${college.name}`);
                    return false;
                }

                for (let branch in college.cutoffRanks) {
                    console.log(`   🔎 Branch: ${branch}, Cutoff Data:`, college.cutoffRanks[branch]);

                    if (!college.cutoffRanks[branch]) continue;

                    const cutoff = college.cutoffRanks[branch][category];  // Might be `undefined`
                    console.log(`   📊 ${college.name} - ${branch} - ${category}:`, cutoff);

                    if (cutoff && rank >= cutoff.opening && rank <= cutoff.closing) {
                        console.log(`✅ ${college.name} is eligible for ${branch}!`);
                        return true;
                    }
                }
                return false;
            });

            console.log("🎯 Eligible Colleges:", eligibleColleges);
            displayColleges(eligibleColleges);
        } catch (error) {
            console.error("❌ Error fetching data:", error);
        }
    });
});

