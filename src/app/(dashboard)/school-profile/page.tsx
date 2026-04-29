import Image from "next/image";

const SchoolProfilePage = () => {
  return (
    <div className="p-6 flex flex-col gap-8">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-plSky to-blue-900 p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
         <div className="relative z-10">
            <h1 className="text-4xl font-extrabold mb-2 uppercase tracking-tight">ST. NORBERT&apos;S SCHOOL</h1>
            <p className="text-blue-100 italic text-lg mb-6 max-w-2xl">
              &quot;Imparting modern education to catholic students in a manner that will conserve their religion, language and culture.&quot;
            </p>
            <div className="flex flex-wrap gap-6 text-sm font-medium">
               <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                  📍 Bahraich, Uttar Pradesh, 271802
               </div>
               <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                  📧 principalnorbertsmailbox@gmail.com
               </div>
               <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
                  📞 9918696964
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* LEFT COLUMN: INTRO & MESSAGES */}
         <div className="lg:col-span-2 flex flex-col gap-8">
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
               <h2 className="text-2xl font-bold text-plSky mb-4 border-b pb-2">An Introduction</h2>
               <p className="text-gray-600 leading-relaxed">
                  St. Norbert&apos;s School is an unaided and Christian Minority English Medium School, established and administered by the Catholic Diocese of Lucknow, a Registered Society. The school was founded in 1994 with the object of imparting modern education to catholic students in a manner that will conserve their &apos;religion, language and culture&apos; but admission is not denied to students profession other faiths. The formation of character is the first essential of any sound education system, and so, great stress is laid on the inculcation of high ideals, gentle behavior and moral rectitude.
               </p>
               <p className="text-gray-600 leading-relaxed mt-4">
                  The institution conducts Classes from Nursery to Twelfth (I.S.C.) and is affiliated to the Council for the Indian School Certificate Examinations, New Delhi.
               </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* PRINCIPAL */}
               <div className="bg-plSkyLight p-8 rounded-3xl border border-plSky/10">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-16 h-16 bg-plSky rounded-2xl flex items-center justify-center text-white font-bold text-2xl">FD</div>
                     <div>
                        <h3 className="font-bold text-plSky">Fr. Paul D&apos;Souza</h3>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Principal</p>
                     </div>
                  </div>
                  <p className="text-sm text-gray-600 italic leading-relaxed">
                    &quot;As we stand on the threshold of a new academic session, I extend a hearty and warm welcome... Education is the most powerful weapon you can use to change the world.&quot;
                  </p>
               </div>

               {/* HEADMISTRESS */}
               <div className="bg-plPurpleLight p-8 rounded-3xl border border-plPurple/10">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-16 h-16 bg-plPurple rounded-2xl flex items-center justify-center text-white font-bold text-2xl">SS</div>
                     <div>
                        <h3 className="font-bold text-plPurple">Rev. Sr. Shany</h3>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Headmistress</p>
                     </div>
                  </div>
                  <p className="text-sm text-gray-600 italic leading-relaxed">
                    &quot;It is an honor to welcome you to St. Norbert’s School, where education goes beyond academics to shape young minds with values, discipline, and a passion for lifelong learning.&quot;
                  </p>
               </div>
            </div>
         </div>

         {/* RIGHT COLUMN: VISION, MISSION, VALUES */}
         <div className="flex flex-col gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-plSky mb-2 flex items-center gap-2">
                  <span className="w-2 h-8 bg-plSky rounded-full"></span> Vision
               </h3>
               <p className="text-sm text-gray-500 leading-relaxed">
                  To nurture a generation of confident, compassionate, and responsible individuals who are equipped with knowledge, skills, and values to make a positive impact on the world.
               </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-plPurple mb-2 flex items-center gap-2">
                  <span className="w-2 h-8 bg-plPurple rounded-full"></span> Mission
               </h3>
               <p className="text-sm text-gray-500 leading-relaxed">
                  Inspiring students to discover their passions, set meaningful goals, and strive for excellence in all aspects of life through a holistic education.
               </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
               <h3 className="text-xl font-bold text-plYellow mb-2 flex items-center gap-2">
                  <span className="w-2 h-8 bg-plYellow rounded-full"></span> Values
               </h3>
               <ul className="text-sm text-gray-500 list-disc pl-5 flex flex-col gap-1">
                  <li>Respect & Integrity</li>
                  <li>Compassion & Excellence</li>
                  <li>Moral Integrity</li>
                  <li>Social Responsibility</li>
                  <li>Dignity of Labor</li>
               </ul>
            </div>

            {/* DEVELOPER BRANDING */}
            <div className="mt-auto bg-gray-50 p-6 rounded-3xl border border-gray-100">
               <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Developed By</p>
               <a 
                 href={process.env.NEXT_PUBLIC_DEVELOPER_URL} 
                 target="_blank" 
                 className="font-bold text-black hover:underline"
               >
                 Verve Nova Technologies Pvt Ltd
               </a>
               <p className="text-[10px] text-gray-500 mt-2 italic">Empowering schools with cutting-edge ERP solutions.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SchoolProfilePage;
