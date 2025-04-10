import React from 'react';
import { Button } from "@/components/ui/button"; // Ensure ShadCN UI is properly installed

function LandingPage() {
    return (
        <>
            <div className="flex justify-center items-center mt-10">
                <h1 className="text-3xl text-red-800 text-center font-bold">
                    Practice Weekly, Perform Better.
                </h1>
            </div>

            <div className="flex justify-between items-center mt-6 px-10">
                <img src="/images/hero.jfif" className="w-[550px] rounded-[30px] ml-20" alt="Hero Image" />
                <div>
                    <p className="w-[700px] text-lg text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, impedit aperiam corrupti quo earum ipsam!
                        Fugit tenetur cumque eligendi quibusdam perferendis provident sequi exercitationem nisi, aliquid earum et!
                        Alias, tempora.<br /><br />
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis provident voluptate nostrum harum tempora debitis quasi reprehenderit qui, sunt laborum! Amet mollitia nesciunt sint fugit quia, natus voluptatem voluptatum similique.
                        <br /><br />
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas, enim aliquam. Aliquid, modi quo. Beatae alias debitis, in modi enim dignissimos possimus? Provident libero eos nulla alias sed. Maxime, rem!</p>
                    </p><br /><br />

                    <div className="mt-4">
                        <Button className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-800">
                            Start Test Now
                        </Button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default LandingPage;