import styled from 'styled-components';

export const Container = styled.div`
	.container .ql-editor{
		width:8.5in;
		min-height:11in;
		/*padding:1in;*/
		margin:0.5rem;
		box-shadow:0 0 5px 0 rgba(0,0,0,.5);
		background-color:white;
		background-color:#F3F3F3;
		justify-content: center;
	}

	.container .ql-container.ql-snow{
		border: none;
		display: flex;
		justify-content: center;
	}

	.container .ql-toolbar.ql-snow{
		/*width:8.5in;*/
		display: flex;
		justify-content: center;
		position: sticky;
		top: 0;
		z-index: 1;
		background-color: #F3F3F3;
		border: none;
		box-shadow:0 0 5px 0 rgba(0,0,0,.5);
	}

	/*@page{
		margin:1in;
	}

	@media print{
		body{
			background:none;
		}

		.container .ql-editor{
			width:6.5in;
			height:9in;
			padding:0;
			margin:0;
			box-shadow:none;
			align-self:flex-start;
		}
		.container .ql-toolbar.ql-snow{
			display:none;
		}
	}*/
`;