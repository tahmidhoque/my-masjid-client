import { Box } from "@mui/material";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import backgroundImage from "../assets/background-img.png";

export const PageWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<Box
			id="page-wrapper"
			sx={{
				display: "flex",
				width: "100%",
				height: "100vh",
				flexDirection: "row",
				backgroundImage: backgroundImage,
			}}
		>
			<Box
				component="main"
				sx={{
					padding: "10px 20px 0 20px",
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
				}}
			>
				<motion.div
					initial="initial"
					animate="in"
					exit="out"
					variants={{
						initial: { opacity: 0 },
						in: { opacity: 1 },
						out: { opacity: 0 },
					}}
					transition={{
						type: "tween",
						ease: "anticipate",
						duration: 3,
					}}
					style={{ height: "100%" }}
				>
					<Box sx={{ overflow: "auto", height: "100%", borderRadius: "10px" }}>
						{children}
					</Box>
				</motion.div>
				<Box
					component={"footer"}
					sx={{
						padding: 2,
						textAlign: "center",
						color: "grey",
						alignSelf: "flex-end",
						margin: "auto",
					}}
				>
					<>Provided by Masjid Solutions</>
				</Box>
			</Box>
		</Box>
	);
};
